import React, { useState, useEffect, useMemo } from "react";
import {
  Copy,
  Plus,
  X,
  User,
  Lock,
  Globe,
  ChevronDown,
  ChevronUp,
  Expand,
  Heart,
  MessageCircleCode,
  SquarePen,
  LockKeyhole,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useTheme, APP_BACKGROUND_COLOR } from "./ThemeContext";
import { Link } from "@tanstack/react-router";
import "./fonts.css";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PromptForm } from "./components/PromptForm";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Switch } from "./components/ui/switch";
import { Id } from "../convex/_generated/dataModel";
import { CATEGORIES } from "./constants/categories";

interface Prompt {
  _id: string;
  _creationTime?: number;
  title: string;
  description: string;
  prompt: string;
  categories: string[];
  stars: number;
  likes?: number;
  githubProfile?: string;
  isPublic: boolean;
  slug?: string;
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/* This is start of prompt card */

const PromptCard = ({
  prompt,
  copied,
  onCopy,
  isOwner,
  onEdit,
  onToggleVisibility,
}: {
  prompt: Prompt;
  copied: string | null;
  onCopy: (text: string) => void;
  isOwner?: boolean;
  onEdit?: (prompt: Prompt) => void;
  onToggleVisibility?: (prompt: Prompt) => void;
}) => {
  return (
    <div className="mt-4">
      <SandpackProvider
        theme="dark"
        template="static"
        files={{
          "/prompt.txt": prompt.prompt,
        }}
        options={{
          visibleFiles: ["/prompt.txt"],
          activeFile: "/prompt.txt",
        }}>
        <div className="flex items-center px-4 py-2 bg-[#2A2A2A] border-b border-[#343434]">
          <span className="text-[#6C6C6C] text-[12px] font-mono"></span>
          <div className="flex items-center gap-1">
            {/* <Link
              to="/prompt/$slug"
              params={{ slug: prompt.slug || generateSlug(prompt.title) }}
              search={(prev) => ({
                ...prev,
                slug: prompt.slug || generateSlug(prompt.title),
              })}
              className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
              <MessageCircleCode size={14} />
              <span className="text-[12px] font-mono">Comment</span>
            </Link> */}

            <Link
              to="/prompt/$slug"
              params={{ slug: prompt.slug || generateSlug(prompt.title) }}
              className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
              <Expand size={14} />
              <span className="text-[12px] font-mono">open</span>
            </Link>

            {isOwner && onEdit && (
              <button
                onClick={() => onEdit(prompt)}
                className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
                <SquarePen size={14} />
                <span className="text-[12px] font-mono">Edit</span>
              </button>
            )}

            {isOwner && onToggleVisibility && (
              <button
                onClick={() => onToggleVisibility(prompt)}
                className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
                {prompt.isPublic ? <Lock size={14} /> : <LockKeyhole size={14} />}
                <span className="text-[12px] font-mono">
                  {prompt.isPublic ? "Private" : "Public"}
                </span>
              </button>
            )}

            <button
              onClick={() => onCopy(prompt.prompt)}
              className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
              {copied === prompt.prompt ? (
                <span className="text-[12px] font-mono">Copied!</span>
              ) : (
                <>
                  <Copy size={14} />
                  <span className="text-[12px] font-mono">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
        {/* code editor start*/}
        <SandpackLayout>
          <SandpackCodeEditor
            showTabs={false}
            showLineNumbers
            readOnly
            showReadOnly={false}
            wrapContent
            closableTabs={false}
          />
        </SandpackLayout>
      </SandpackProvider>
      {/* code editor end */}
    </div>
  );
};

function App() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Array<{ name: string; count: number }>>(
    CATEGORIES.map((category) => ({ name: category, count: 0 }))
  );
  const [count, setCount] = useState(0);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMyPromptsOpen, setIsMyPromptsOpen] = useState(false);
  const [showPrivatePrompts, setShowPrivatePrompts] = useState(false);
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
  const likePromptMutation = useMutation(api.prompts.likePrompt);
  const unlikePromptMutation = useMutation(api.prompts.unlikePrompt);
  const updatePromptMutation = useMutation(api.prompts.updatePrompt);
  const toggleVisibilityMutation = useMutation(api.prompts.togglePromptVisibility);
  const deleteCustomCategoryMutation = useMutation(api.prompts.deleteCustomCategory);
  const { isSignedIn, user } = useUser();
  const [sortByLikes, setSortByLikes] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [promptToToggle, setPromptToToggle] = useState<Prompt | null>(null);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(
    null
  );
  const [isListView, setIsListView] = useState(false);

  const customCategories = useQuery(api.prompts.getUserCustomCategories) || [];
  const searchResults = useQuery(api.prompts.searchPrompts, {
    searchQuery: searchQuery || undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  useEffect(() => {
    if (!searchResults) return;

    // Combine default categories with custom categories
    const allCategories = [...CATEGORIES, ...customCategories.map((cat) => cat.name)];

    setCategories(
      allCategories.map((category) => ({
        name: category,
        count: searchResults?.filter((prompt) => prompt.categories.includes(category)).length || 0,
      }))
    );
  }, [searchResults, customCategories]);

  const privatePrompts = useQuery(api.prompts.getPrivatePrompts) || [];
  const privatePromptsCount = privatePrompts?.length || 0;

  const prompts = searchResults || [];

  const sortedPrompts = useMemo(() => {
    let sorted = [...prompts];

    if (sortByDate) {
      sorted = sorted.sort((a, b) => (b._creationTime || 0) - (a._creationTime || 0));
    } else if (sortByLikes) {
      sorted = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return sorted;
  }, [prompts, sortByLikes, sortByDate]);

  const sortedPrivatePrompts = useMemo(() => {
    let sorted = [...privatePrompts];

    if (sortByDate) {
      sorted = sorted.sort((a, b) => (b._creationTime || 0) - (a._creationTime || 0));
    } else if (sortByLikes) {
      sorted = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return sorted;
  }, [privatePrompts, sortByLikes, sortByDate]);

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const getDomainFromUrl = (url: string) => {
    try {
      if (!url.startsWith("http")) return `@${url}`;

      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace("www.", "");

      if (domain === "github.com") return `@${urlObj.pathname.split("/")[1]}`;

      if (domain === "twitter.com" || domain === "x.com")
        return `@${urlObj.pathname.split("/")[1]}`;

      if (domain === "linkedin.com") return `@${urlObj.pathname.split("/")[2]}`;

      return `@${urlObj.pathname.split("/")[1]}`;
    } catch {
      return url.startsWith("@") ? url : `@${url}`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleFilterCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  useEffect(() => {
    setCount(prompts.length);
  }, [prompts.length]);

  const bgColor = APP_BACKGROUND_COLOR;
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";

  const handleLike = async (promptId: Id<"prompts">) => {
    if (likedPrompts.has(promptId)) {
      await unlikePromptMutation({
        promptId,
      });
      setLikedPrompts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(promptId);
        return newSet;
      });
      return;
    }

    try {
      setLikedPrompts((prev) => new Set([...prev, promptId]));

      await likePromptMutation({
        promptId,
      });
    } catch (error) {
      setLikedPrompts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(promptId);
        return newSet;
      });
      console.error("Error liking prompt:", error);
    }
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsEditModalOpen(true);
  };

  const handleToggleVisibility = (prompt: Prompt) => {
    setPromptToToggle(prompt);
    setIsVisibilityModalOpen(true);
  };

  const handleSaveEdit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!editingPrompt) return;

    try {
      await updatePromptMutation({
        id: editingPrompt._id as Id<"prompts">,
        title: editingPrompt.title,
        description: editingPrompt.description,
        prompt: editingPrompt.prompt,
        categories: editingPrompt.categories,
        githubProfile: editingPrompt.githubProfile,
      });
      setIsEditModalOpen(false);
      setEditingPrompt(null);
    } catch (error) {
      console.error("Error updating prompt:", error);
      alert("Failed to update prompt. Please try again.");
    }
  };

  const confirmToggleVisibility = async () => {
    if (!promptToToggle) return;

    try {
      await toggleVisibilityMutation({
        id: promptToToggle._id as Id<"prompts">,
        isPublic: !promptToToggle.isPublic,
      });
      setIsVisibilityModalOpen(false);
      setPromptToToggle(null);
    } catch (error) {
      console.error("Error toggling visibility:", error);
      alert("Failed to update prompt visibility. Please try again.");
    }
  };

  const handleDeleteCustomCategory = (categoryId: Id<"customCategories">, categoryName: string) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setIsDeleteCategoryModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCustomCategoryMutation({ id: categoryToDelete.id as Id<"customCategories"> });
      setIsDeleteCategoryModalOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error deleting custom category:", error);
      alert("Failed to delete custom category. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="sticky top-0 z-50">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsModalOpen={setIsModalOpen}
          setIsSignInOpen={setIsSignInOpen}
        />
      </div>
      <div className="relative flex flex-col lg:flex-row gap-6 max-w-[full] mx-auto px-4 sm:px-6 py-8">
        <div className="w-full lg:w-64 lg:flex-none">
          <div className="lg:sticky lg:top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <ChevronDown size={16} />
                  Scroll to bottom
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={showPrivatePrompts}
                  onCheckedChange={(checked) => {
                    if (isSignedIn) {
                      setShowPrivatePrompts(checked);
                      setIsMyPromptsOpen(false);
                    } else {
                      setIsSignInOpen(true);
                    }
                  }}
                  disabled={!isSignedIn}
                  className="data-[state=checked]:bg-[#1a1a1a]"
                />
                <button
                  onClick={() => {
                    if (isSignedIn) {
                      setShowPrivatePrompts(!showPrivatePrompts);
                      setIsMyPromptsOpen(false);
                    } else {
                      setIsSignInOpen(true);
                    }
                  }}
                  className={cn(
                    mutedTextColor,
                    "text-sm flex items-center gap-2 hover:text-gray-700 transition-colors"
                  )}>
                  <span>{showPrivatePrompts ? "My Prompts" : "All Prompts"}</span>
                  {privatePromptsCount > 0 && (
                    <span className="text-xs bg-[#2A2A2A] text-white px-1.5 py-0.5 rounded">
                      {privatePromptsCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={sortByDate}
                  onCheckedChange={(checked) => {
                    if (isSignedIn) {
                      setSortByDate(checked);
                      if (checked) setSortByLikes(false); // Disable likes sort when date sort is enabled
                    } else {
                      setIsSignInOpen(true);
                    }
                  }}
                  disabled={!isSignedIn}
                  className="data-[state=checked]:bg-[#1a1a1a]"
                />
                <button
                  onClick={() => {
                    if (isSignedIn) {
                      setSortByDate(!sortByDate);
                      if (!sortByDate) setSortByLikes(false); // Disable likes sort when date sort is enabled
                    } else {
                      setIsSignInOpen(true);
                    }
                  }}
                  className={cn(mutedTextColor, "text-sm hover:text-gray-700 transition-colors")}>
                  sort by date
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={sortByLikes}
                  onCheckedChange={(checked) => {
                    if (isSignedIn) {
                      setSortByLikes(checked);
                      if (checked) setSortByDate(false); // Disable date sort when likes sort is enabled
                    } else {
                      setIsSignInOpen(true);
                    }
                  }}
                  disabled={!isSignedIn}
                  className="data-[state=checked]:bg-[#1a1a1a]"
                />
                <button
                  onClick={() => {
                    if (isSignedIn) {
                      setSortByLikes(!sortByLikes);
                      if (!sortByLikes) setSortByDate(false); // Disable date sort when likes sort is enabled
                    } else {
                      setIsSignInOpen(true);
                    }
                  }}
                  className={cn(mutedTextColor, "text-sm hover:text-gray-700 transition-colors")}>
                  sort by{" "}
                  <span className="text-sm">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI0Ljc2MiAzOC44YzExLjQ3Ni0xMC42MjYgMTUuMTEtMTQuNDQyIDE3LjUyNy0xOS4wMTZDNDMuNDUgMTcuNTg5IDQ0IDE1LjU1NCA0NCAxMy40NzkgNDQgOC4xMiAzOS45NjQgNCAzNC44IDRjLTIuMDMgMC00LjA3My42NzYtNS44MjIgMS45MThhNS43MzUgNS43MzUgMCAwIDAtLjM1OS4yODhjLS4wOTYuMDgyLS4xOTguMTcyLS4zMDYuMjdhMjIuMDUyIDIyLjA1MiAwIDAgMC0xLjExIDEuMDg4Yy0xLjc0NiAxLjc4OC00LjY1IDEuODA5LTYuNDUzLS4wNDhhMjEuNTE0IDIxLjUxNCAwIDAgMC0xLjA5NS0xLjA2NmMtLjEyLS4xMDgtLjIzMy0uMjA3LS4zMzktLjI5NmE1Ljg0MiA1Ljg0MiAwIDAgMC0uMzI1LS4yNThDMTcuMjY5IDQuNjc0IDE1LjIyNSA0IDEzLjIgNCA4LjAzNiA0IDQgOC4xMjEgNCAxMy40NzljMCAyLjA2Ny41NDYgNC4wOTIgMS42OTYgNi4yNzcgMi40MSA0LjU4IDYuMDIgOC4zNzYgMTcuNTM2IDE5LjA2M2wuNzU4LjY5OS43NzItLjcxOFpNMzQuOCAwQzQyLjE5MiAwIDQ4IDUuOTMgNDggMTMuNDc5YzAgOS4yNjMtOC4xNiAxNi44MTEtMjAuNTIgMjguMjU2bC0xLjcgMS41OGMtLjk3My45MDQtMi41NzcuOTE5LTMuNTYuMDEybC0xLjctMS41NjhDOC4xNiAzMC4yOSAwIDIyLjc0MiAwIDEzLjQ3OSAwIDUuOTMgNS44MDggMCAxMy4yIDBjMi45MjUgMCA1Ljc2Ny45NzQgOC4xMDcgMi42MzUgMS4wMjYuNzM0IDIuMzQ5IDIuMTMzIDIuMzQ5IDIuMTMzLjE5LjE5NS41MDQuMTg3LjY4NyAwIDAgMCAxLjMyNC0xLjM5OSAyLjMwOC0yLjEwM0MyOS4wMzMuOTc0IDMxLjg3NSAwIDM0LjggMFoiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iIzZiNzI4MCIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PC9zdmc+"
                      alt="heart icon"
                      className="inline w-4 h-4"
                    />
                  </span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={isListView}
                  onCheckedChange={setIsListView}
                  className="data-[state=checked]:bg-[#1a1a1a]"
                />
                <label className={cn(mutedTextColor, "text-sm")}>list view</label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn(textColor, "text-sm font-medium")}>Categories</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
                  {categories
                    .filter(
                      (category) =>
                        category.count > 0 ||
                        (isSignedIn && customCategories.some((cc) => cc.name === category.name))
                    )
                    .map((category) => {
                      const isCustomCategory = customCategories.some(
                        (cc) => cc.name === category.name
                      );
                      const customCategoryData = customCategories.find(
                        (cc) => cc.name === category.name
                      );

                      return (
                        <div key={category.name} className="flex items-center gap-1">
                          <button
                            onClick={() => toggleFilterCategory(category.name)}
                            className={cn(
                              selectedCategories.includes(category.name)
                                ? "bg-[#1a1a1a] text-white"
                                : cn(
                                    mutedTextColor,
                                    `hover:${buttonBgColor}`,
                                    `hover:${textColor}`
                                  ),
                              "flex items-center justify-between px-2.5 py-1.5 text-left transition-colors duration-200 rounded-md text-[0.875em] flex-1"
                            )}>
                            <span className="flex items-center gap-2">
                              {(category.name === "Cursor" || category.name === ".cursorrules") && (
                                <img
                                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPjxwYXRoIGQ9Ik01My44IDE3LjkgMzMgOS42Yy0uNy0uMy0xLjUtLjMtMi4yIDBsLTIwLjYgOC4yYy0uOC4zLTEuMiAxLTEuMiAxLjh2MjQuN2MwIC44LjUgMS41IDEuMiAxLjhMMzEgNTQuNGMuNC4xLjcuMiAxLjEuMlYyOC44YzAtLjguNS0xLjUgMS4yLTEuOGwyMS4zLTguNWMtLjItLjMtLjUtLjUtLjgtLjZ6IiBmaWxsPSIjNmI3MjgwIiBjbGFzcz0iZmlsbC1kOWRjZTEiPjwvcGF0aD48cGF0aCBkPSJNNTUgMTkuN2MwLS40LS4yLS45LS40LTEuMkwzMy4zIDI3Yy0uOC4zLTEuMiAxLTEuMiAxLjh2MjUuOGMuNCAwIC43LS4xIDEuMS0uMmwyMC42LTguMmMuOC0uMyAxLjItMSAxLjItMS44VjE5Ljd6IiBmaWxsPSIjNmI3MjgwIiBjbGFzcz0iZmlsbC1kOWRjZTEiPjwvcGF0aD48cGF0aCBkPSJtNTAuNCAyMC4yLTE4LjMgNy4zVjUxTTEyLjkgMjAuNWwxOS4yIDciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGNsYXNzPSJzdHJva2UtZmZmZmZmIj48L3BhdGg+PC9zdmc+"
                                  width="24"
                                  height="24"
                                  alt="Cursor icon"
                                />
                              )}
                              {category.name === "Convex" && (
                                <img
                                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODU1IiBoZWlnaHQ9Ijg2MSIgdmlld0JveD0iMCAwIDg1NSA4NjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MzkuOTI0IDY3OC4xMTRDNjY3LjE1MSA2NjQuMjI2IDc4Ny4wOTQgNTk3LjYwMiA4NTMuMTM1IDQ4Ni40QzgyMS44NjMgNzYxLjQ0MyA1MTUuODM4IDkzNS4yODcgMjY2LjA0NiA4MjguNTUzQzI0My4wMjkgODE4Ljc0NCAyMjMuMjE3IDgwMi40MjggMjA5LjYyIDc4MS40NUMxNTMuNDg1IDY5NC44MTkgMTM1LjAzMiA1ODQuNTg4IDE2MS41NDYgNDg0LjU1NUMyMzcuMjk5IDYxMy4wNDQgMzkxLjMzMSA2OTEuODA4IDUzOS45MjQgNjc4LjExNFoiIGZpbGw9IiM2QjcyODAiLz4KPHBhdGggZD0iTTE1Ni44ODUgNDAzLjg0OUMxMDUuMzE0IDUyMC45NzUgMTAzLjA4IDY1OC4xMDggMTY2LjMwNSA3NzAuOTYxQy01Ni4xOTU5IDYwNi40NCAtNTMuNzY3OSAyNTQuMzgxIDE2My41ODYgOTEuNTExNEMxODMuNjkgNzYuNDU3OCAyMDcuNTgxIDY3LjUyMjggMjMyLjYzOCA2Ni4xNjMxQzMzNS42ODIgNjAuODIxNSA0NDAuMzc3IDk5Ljk2MDggNTEzLjggMTcyLjg5OEMzNjQuNjI0IDE3NC4zNTUgMjE5LjMzMyAyNjguMjY5IDE1Ni44ODUgNDAzLjg0OVoiIGZpbGw9IiM2QjcyODAiLz4KPHBhdGggZD0iTTU4NS43NTYgMjA4LjkzMkM1MTAuNDg4IDEwNS43OTEgMzkyLjY4MiAzNS41NzM1IDI2My42MDkgMzMuNDM2OEM1MTMuMTEgLTc3Ljg2MjQgODIwLjAwOCAxMDIuNTg2IDg1My40MTggMzY5LjM3NEM4NTYuNTI1IDM5NC4xNCA4NTIuNDQ2IDQxOS4zOTEgODQxLjI3OCA0NDEuNzI4Qzc5NC42NiA1MzQuNzY5IDcwOC4yMjQgNjA2LjkyOSA2MDcuMjE5IDYzMy42MzdDNjgxLjIyNCA0OTguNzM3IDY3Mi4wOTUgMzMzLjkyNSA1ODUuNzU2IDIwOC45MzJaIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo="
                                  width="16"
                                  height="16"
                                  alt="Convex icon"
                                />
                              )}
                              <span className="truncate">{category.name}</span>
                            </span>
                            <span
                              className={cn(
                                selectedCategories.includes(category.name)
                                  ? "text-gray-400"
                                  : "text-[#525252]",
                                "text-sm ml-2"
                              )}>
                              {category.count}
                            </span>
                          </button>
                          {isSignedIn && isCustomCategory && customCategoryData && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCustomCategory(
                                  customCategoryData._id,
                                  customCategoryData.name
                                );
                              }}
                              className={cn(
                                mutedTextColor,
                                "hover:text-red-500 transition-colors duration-200 p-1"
                              )}
                              title="Delete custom category">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "w-full px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm mt-4"
                )}>
                <Plus size={16} />
                <span>Add Prompt</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ChevronUp size={16} />
                Scroll to top
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {isListView ? (
            // List View - Hacker News style
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showPrivatePrompts ? sortedPrivatePrompts : sortedPrompts).map((prompt, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-white border border-gray-200",
                    "p-3 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                  )}>
                  <div className="flex items-center gap-3">
                    {/* Index number */}
                    <span className={cn(mutedTextColor, "text-sm font-mono w-6 text-right")}>
                      {index + 1}.
                    </span>

                    {/* Privacy indicator */}
                    {!prompt.isPublic && isSignedIn && (
                      <div className="bg-black px-1.5 py-1.5 rounded">
                        <Lock size={14} className="text-white" />
                      </div>
                    )}

                    {/* Title and link */}
                    <div className="flex-1">
                      <Link
                        to="/prompt/$slug"
                        params={{ slug: prompt.slug || generateSlug(prompt.title) }}
                        className={cn(textColor, "text-sm font-medium hover:underline")}>
                        {prompt.title}
                      </Link>

                      {/* Categories */}
                      <div className="flex items-center gap-2 mt-1">
                        {prompt.categories.slice(0, 3).map((category, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              mutedTextColor,
                              "text-xs px-1.5 py-0.5 bg-gray-100 rounded"
                            )}>
                            {category}
                          </span>
                        ))}
                        {prompt.categories.length > 3 && (
                          <span className={cn(mutedTextColor, "text-xs")}>
                            +{prompt.categories.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {/* Like button */}
                      <button
                        onClick={() => handleLike(prompt._id)}
                        className={cn(
                          "flex items-center gap-1 transition-colors duration-200",
                          likedPrompts.has(prompt._id) ? "text-[#2a2a2a]" : mutedTextColor
                        )}>
                        <Heart
                          size={14}
                          className={likedPrompts.has(prompt._id) ? "fill-current" : ""}
                        />
                        <span className="text-xs">{prompt.likes || 0}</span>
                      </button>

                      {/* Social profile */}
                      {prompt.githubProfile && (
                        <a
                          href={
                            prompt.githubProfile.startsWith("http")
                              ? prompt.githubProfile
                              : `https://github.com/${prompt.githubProfile.replace("@", "")}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            mutedTextColor,
                            "hover:text-gray-700 flex items-center gap-1 transition-colors duration-200"
                          )}>
                          <User size={14} />
                          <span className="text-xs">{getDomainFromUrl(prompt.githubProfile)}</span>
                        </a>
                      )}

                      {/* Open link */}
                      <Link
                        to="/prompt/$slug"
                        params={{ slug: prompt.slug || generateSlug(prompt.title) }}
                        className={cn(
                          mutedTextColor,
                          "hover:text-gray-700 transition-colors duration-200"
                        )}>
                        <Expand size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Grid View - Original layout
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {(showPrivatePrompts ? sortedPrivatePrompts : sortedPrompts).map((prompt, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-white",
                    "border border-gray-200",
                    "p-3 sm:p-4 transition-all duration-200 rounded-lg"
                  )}>
                  <div className="flex justify-between items-start text-left">
                    <div className="flex items-center gap-2">
                      {!prompt.isPublic && isSignedIn && (
                        <div className="bg-black px-1.5 py-1.5 rounded">
                          <Lock size={14} className="text-white" />
                        </div>
                      )}

                      <h2
                        className={cn(
                          textColor,
                          "text-base sm:text-med font-normal mb-1.5 text-left"
                        )}>
                        {prompt.title}
                      </h2>
                    </div>
                  </div>
                  <p className={cn(mutedTextColor, "mb-3 text-xs sm:text-sm text-left")}>
                    {prompt.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-left">
                    {prompt.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          buttonBgColor,
                          mutedTextColor,
                          "inline-block px-2 py-1 text-xs sm:text-sm rounded-md text-left"
                        )}>
                        {category}
                      </span>
                    ))}
                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={() => handleLike(prompt._id)}
                        className={cn(
                          "flex items-center gap-1 transition-colors duration-200",
                          likedPrompts.has(prompt._id) ? "text-[#2a2a2a]" : mutedTextColor
                        )}>
                        <Heart
                          size={16}
                          className={likedPrompts.has(prompt._id) ? "fill-current" : ""}
                        />
                        <span className="text-xs">{prompt.likes || 0}</span>
                      </button>
                      {prompt.githubProfile && (
                        <a
                          href={
                            prompt.githubProfile.startsWith("http")
                              ? prompt.githubProfile
                              : `https://github.com/${prompt.githubProfile.replace("@", "")}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            mutedTextColor,
                            `hover:${textColor}`,
                            "flex items-center gap-1 transition-colors duration-200 text-left"
                          )}>
                          <User size={16} />
                          <span className="text-xs sm:text-sm">
                            {getDomainFromUrl(prompt.githubProfile)}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                  <PromptCard
                    prompt={prompt}
                    copied={copied}
                    onCopy={copyToClipboard}
                    isOwner={isSignedIn && user && user.id === prompt.userId}
                    onEdit={handleEditPrompt}
                    onToggleVisibility={handleToggleVisibility}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PromptForm
          isModal={true}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setIsModalOpen(false)}
        />
      )}

      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={cn(bgColor, "p-4 rounded-lg max-w-sm w-full border", borderColor)}>
            <div className="flex justify-between items-center mb-2">
              <h2 className={cn(textColor, "text-sm font-normal")}>
                Log in to create private prompts.
              </h2>
              <button
                onClick={() => setIsSignInOpen(false)}
                className={cn(mutedTextColor, "hover:text-white transition-colors")}>
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {isMyPromptsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className={cn(
              bgColor,
              "p-6 rounded-lg max-w-4xl w-full border",
              borderColor,
              "max-h-[90vh] overflow-y-auto"
            )}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={cn(textColor, "text-lg font-medium")}>
                {isSignedIn ? "My Private Prompts" : "Sign In Required"}
              </h2>
              <button
                onClick={() => setIsMyPromptsOpen(false)}
                className={cn(mutedTextColor, "hover:text-white transition-colors")}>
                <X size={20} />
              </button>
            </div>

            {!isSignedIn ? (
              <div className="mt-2">
                <SignInButton mode="modal">
                  <button className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    Sign in to view private prompts
                  </button>
                </SignInButton>
              </div>
            ) : privatePrompts && privatePrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {privatePrompts.map((prompt) => (
                  <div
                    key={prompt._id}
                    className={cn(
                      bgColor,
                      "border",
                      borderColor,
                      "p-3 sm:p-4 transition-all duration-200 rounded-lg"
                    )}>
                    <div className="flex justify-between items-start">
                      <h2 className={cn(textColor, "text-base sm:text-lg font-semibold mb-1.5")}>
                        {prompt.title}
                      </h2>
                    </div>
                    <p className={cn(mutedTextColor, "mb-3 text-xs sm:text-sm")}>
                      {prompt.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {prompt.categories.map((category, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            buttonBgColor,
                            mutedTextColor,
                            "inline-block px-2 py-1 text-xs sm:text-sm rounded-md"
                          )}>
                          {category}
                        </span>
                      ))}
                    </div>
                    <PromptCard prompt={prompt} copied={copied} onCopy={copyToClipboard} />
                  </div>
                ))}
              </div>
            ) : (
              <p className={cn(mutedTextColor, "text-center py-8")}>
                You don't have any private prompts yet. Create one by setting visibility to private
                when adding a new prompt.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingPrompt && (
        <PromptForm
          isModal={true}
          isEditing={true}
          promptId={editingPrompt._id}
          initialData={{
            title: editingPrompt.title,
            description: editingPrompt.description,
            prompt: editingPrompt.prompt,
            categories: editingPrompt.categories,
            githubProfile: editingPrompt.githubProfile || "",
            isPublic: editingPrompt.isPublic,
          }}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingPrompt(null);
          }}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setEditingPrompt(null);
          }}
        />
      )}

      {/* Visibility Toggle Modal */}
      {isVisibilityModalOpen && promptToToggle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={cn(bgColor, "p-6 rounded-lg max-w-md w-full border", borderColor)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={cn(textColor, "text-lg font-medium")}>
                {promptToToggle.isPublic ? "Make Private" : "Make Public"}
              </h2>
              <button
                onClick={() => {
                  setIsVisibilityModalOpen(false);
                  setPromptToToggle(null);
                }}
                className={cn(mutedTextColor, "hover:text-white transition-colors")}>
                <X size={20} />
              </button>
            </div>
            <p className={cn(mutedTextColor, "mb-6 text-sm")}>
              {promptToToggle.isPublic
                ? "Are you sure you want to make this prompt private? Only you will be able to see it."
                : "Are you sure you want to make this prompt public? Anyone will be able to see it."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsVisibilityModalOpen(false);
                  setPromptToToggle(null);
                }}
                className={cn(
                  "flex-1 px-4 py-2 border",
                  borderColor,
                  mutedTextColor,
                  "hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                )}>
                Cancel
              </button>
              <button
                onClick={confirmToggleVisibility}
                className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 py-2 transition-colors duration-200 rounded-lg">
                {promptToToggle.isPublic ? "Make Private" : "Make Public"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {isDeleteCategoryModalOpen && categoryToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={cn(bgColor, "p-6 rounded-lg max-w-md w-full border", borderColor)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={cn(textColor, "text-lg font-medium")}>Delete Custom Category</h2>
              <button
                onClick={() => {
                  setIsDeleteCategoryModalOpen(false);
                  setCategoryToDelete(null);
                }}
                className={cn(mutedTextColor, "hover:text-white transition-colors")}>
                <X size={20} />
              </button>
            </div>
            <p className={cn(mutedTextColor, "mb-6 text-sm")}>
              Are you sure you want to delete the "{categoryToDelete.name}" category? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsDeleteCategoryModalOpen(false);
                  setCategoryToDelete(null);
                }}
                className={cn(
                  "flex-1 px-4 py-2 border",
                  borderColor,
                  mutedTextColor,
                  "hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                )}>
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 py-2 transition-colors duration-200 rounded-lg">
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer count={count} />
    </div>
  );
}

export default App;
