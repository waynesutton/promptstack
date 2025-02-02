import React, { useState, useEffect, useMemo } from "react";
import {
  Command,
  Search,
  Copy,
  Star,
  ExternalLink,
  Sparkles,
  Plus,
  X,
  User,
  Sun,
  Moon,
  Cuboid as Cube,
  Database,
  Book,
  Lock,
  Globe,
  Github,
  ChevronDown,
  ChevronUp,
  Share2,
  MessageSquare,
  Share,
  Expand,
  Heart,
  MessageCircleCode,
  Bug,
  SquareArrowOutUpRight,
  Trash2,
  Trash,
} from "lucide-react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { CodeEditor } from "./components/CodeEditor";
import "./fonts.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeBlock } from "./components/CodeBlock";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import { Switch } from "./components/ui/switch";

interface Prompt {
  _id: string;
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

const CATEGORIES = [
  ".cursorrules",
  "Angular",
  "Anthropic(Claude)",
  "AutoHotkey",
  "Backend",
  "Bolt.new",
  "C#",
  "C++",
  "ChatGPT",
  "Codeium",
  "Convex",
  "Creatr",
  "Cursor",
  "Database",
  "Deepseek",
  "Devin",
  "Django",
  "Expo",
  "Express.js",
  "Flutter",
  "Functional",
  "Github Gopilot",
  "Go",
  "Guidelines Doc",
  "HTMX",
  "JavaScript",
  "Jest",
  "Laravel",
  "Loveable",
  "MagicUI",
  "NextJS",
  "Novo Elements",
  "NuxtJS",
  "Openai",
  "Other",
  "Perplexity",
  "Prompt",
  "Python",
  "Radix UI",
  "React",
  "Readme",
  "Replit",
  "Requirements Doc",
  "Ruby on Rails",
  "Rust",
  "Shadcn UI",
  "ShipFast",
  "Solidity",
  "Structure Doc",
  "Supabase",
  "SvelteKit",
  "SwiftUI",
  "TabNine",
  "Tailwind",
  "TanStack",
  "trae",
  "Trickle",
  "Typescript",
  "v0",
  "Vue",
  "Wails.io",
  "Windsurf",
] as const;

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
}: {
  prompt: Prompt;
  copied: string | null;
  onCopy: (text: string) => void;
}) => {
  const ratePromptMutation = useMutation(api.prompts.ratePrompt);
  const likePromptMutation = useMutation(api.prompts.likePrompt);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (isLiked) return;
    try {
      await likePromptMutation({
        promptId: prompt._id,
      });
      setIsLiked(true);
    } catch (error) {
      console.error("Error liking prompt:", error);
    }
  };

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
          codeEditor: {
            additionalLanguages: [
              {
                name: "markdown",
                extensions: ["md", "markdown"],
              },
              {
                name: "javascript",
                extensions: ["js", "jsx"],
              },
              {
                name: "typescript",
                extensions: ["ts", "tsx"],
              },
              {
                name: "css",
                extensions: ["css", "scss", "less"],
              },
              {
                name: "html",
                extensions: ["html"],
              },
              {
                name: "vue",
                extensions: ["vue"],
              },
            ],
          },
        }}>
        <div className="flex items-center px-4 py-2 bg-[#2A2A2A] border-b border-[#343434]">
          <span className="text-[#6C6C6C] text-[12px] font-mono"></span>
          <div className="flex items-center gap-1">
            <Link
              to="/prompt/$slug"
              params={{ slug: prompt.slug || generateSlug(prompt.title) }}
              className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
              <MessageCircleCode size={14} />
              <span className="text-[12px] font-mono">Comment</span>
            </Link>

            <Link
              to="/prompt/$slug"
              params={{ slug: prompt.slug || generateSlug(prompt.title) }}
              className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
              <Expand size={14} />
              <span className="text-[12px] font-mono">Expand</span>
            </Link>
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

const PromptStackLogo = ({ className }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 218 191"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>
    <path
      d="M42 80L67.4286 105.429L42 130.857"
      stroke="currentColor"
      strokeWidth="16.43"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M81 131H167"
      stroke="currentColor"
      strokeWidth="16.43"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M197.562 0H20.4375C8.85625 0 0 8.85625 0 20.4375V170.312C0 181.894 8.85625 190.75 20.4375 190.75H197.562C209.144 190.75 218 181.894 218 170.312V20.4375C218 8.85625 209.144 0 197.562 0ZM204.375 177.125H13.625V40.875H204.375V177.125Z"
      fill="currentColor"
    />
  </svg>
);

const ConvexIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 1665 1677"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>
    <path
      d="M1141.42 407.122C994.759 206.145 765.205 69.3212 513.699 65.1579C999.868 -151.716 1597.88 199.9 1662.98 719.754C1669.04 768.011 1661.09 817.215 1639.32 860.741C1548.49 1042.04 1380.06 1182.65 1183.25 1234.69C1327.45 971.828 1309.66 650.68 1141.42 407.122Z"
      fill="currentColor"
    />
    <path
      d="M305.701 786.921C205.212 1015.15 200.859 1282.36 324.057 1502.26C-109.502 1181.68 -104.77 495.674 318.759 178.311C357.932 148.978 404.486 131.568 453.311 128.919C654.1 118.51 858.105 194.776 1001.17 336.898C710.494 339.737 427.385 522.736 305.701 786.921Z"
      fill="currentColor"
    />
    <path
      d="M1052.1 1321.36C1300.01 1294.3 1533.73 1164.48 1662.41 947.791C1601.47 1483.73 1005.17 1822.48 518.429 1614.5C473.578 1595.39 434.973 1563.59 408.478 1522.72C299.095 1353.91 263.139 1139.12 314.802 944.195C462.413 1194.57 762.555 1348.04 1052.1 1321.36Z"
      fill="currentColor"
    />
  </svg>
);

function App() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    prompt: "",
    categories: [] as string[],
    githubProfile: "",
    stars: 0,
    isPublic: true,
  });
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMyPromptsOpen, setIsMyPromptsOpen] = useState(false);
  const [showPrivatePrompts, setShowPrivatePrompts] = useState(false);
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
  const likePromptMutation = useMutation(api.prompts.likePrompt);
  const { isSignedIn } = useUser();
  const [sortByLikes, setSortByLikes] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  const createPrompt = useMutation(api.prompts.createPrompt);
  const searchResults = useQuery(api.prompts.searchPrompts, {
    searchQuery: searchQuery || undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  const privatePrompts = useQuery(api.prompts.getPrivatePrompts);
  const privatePromptsCount = privatePrompts?.length || 0;

  const prompts = searchResults || [];

  const sortedPrompts = useMemo(() => {
    if (!sortByLikes) return prompts;
    return [...prompts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }, [prompts, sortByLikes]);

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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) {
      alert("Please fill in all required fields (Title and Prompt)");
      return;
    }

    const slug = generateSlug(newPrompt.title);

    try {
      await createPrompt({
        title: newPrompt.title,
        description: newPrompt.description,
        prompt: newPrompt.prompt,
        categories: newPrompt.categories,
        githubProfile: newPrompt.githubProfile,
        isPublic: newPrompt.isPublic,
        slug,
      });

      setNewPrompt({
        title: "",
        description: "",
        prompt: "",
        categories: [],
        githubProfile: "",
        stars: 0,
        isPublic: true,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating prompt:", error);
      alert("Failed to create prompt. Please try again.");
    }
  };

  const toggleCategory = (category: string) => {
    setNewPrompt((prev) => {
      if (prev.categories.includes(category))
        return { ...prev, categories: prev.categories.filter((c) => c !== category) };

      if (prev.categories.length >= 4) return prev;
      return { ...prev, categories: [...prev.categories, category] };
    });
  };

  const toggleFilterCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const getCategoryCount = (category: string) => {
    return prompts.filter((prompt) => prompt.categories.includes(category)).length;
  };

  useEffect(() => {
    setCount(prompts.length);
  }, [prompts.length]);

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  const handleLike = async (promptId: string) => {
    if (likedPrompts.has(promptId)) return;

    try {
      await likePromptMutation({
        promptId,
      });
      setLikedPrompts((prev) => new Set([...prev, promptId]));
    } catch (error) {
      console.error("Error liking prompt:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsModalOpen={setIsModalOpen}
          setIsSignInOpen={setIsSignInOpen}
        />
      </div>
      <div className="relative flex flex-col lg:flex-row gap-6 max-w-[full] mx-auto px-4 sm:px-6 py-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[810px] w-[810px] rounded-full bg-[#ffffff] opacity-60 blur-[100px]"></div>
        </div>
        <div className="w-full lg:w-64 lg:flex-none">
          <div className="lg:sticky lg:top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                  }
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <ChevronDown size={16} />
                  Scroll to bottom
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={sortByLikes}
                  onCheckedChange={setSortByLikes}
                  className="data-[state=checked]:bg-[#1a1a1a]"
                />
                <label className={cn(mutedTextColor, "text-sm")}>
                  sort by{" "}
                  <span className="text-sm">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI0Ljc2MiAzOC44YzExLjQ3Ni0xMC42MjYgMTUuMTEtMTQuNDQyIDE3LjUyNy0xOS4wMTZDNDMuNDUgMTcuNTg5IDQ0IDE1LjU1NCA0NCAxMy40NzkgNDQgOC4xMiAzOS45NjQgNCAzNC44IDRjLTIuMDMgMC00LjA3My42NzYtNS44MjIgMS45MThhNS43MzUgNS43MzUgMCAwIDAtLjM1OS4yODhjLS4wOTYuMDgyLS4xOTguMTcyLS4zMDYuMjdhMjIuMDUyIDIyLjA1MiAwIDAgMC0xLjExIDEuMDg4Yy0xLjc0NiAxLjc4OC00LjY1IDEuODA5LTYuNDUzLS4wNDhhMjEuNTE0IDIxLjUxNCAwIDAgMC0xLjA5NS0xLjA2NmMtLjEyLS4xMDgtLjIzMy0uMjA3LS4zMzktLjI5NmE1Ljg0MiA1Ljg0MiAwIDAgMC0uMzI1LS4yNThDMTcuMjY5IDQuNjc0IDE1LjIyNSA0IDEzLjIgNCA4LjAzNiA0IDQgOC4xMjEgNCAxMy40NzljMCAyLjA2Ny41NDYgNC4wOTIgMS42OTYgNi4yNzcgMi40MSA0LjU4IDYuMDIgOC4zNzYgMTcuNTM2IDE5LjA2M2wuNzU4LjY5OS43NzItLjcxOFpNMzQuOCAwQzQyLjE5MiAwIDQ4IDUuOTMgNDggMTMuNDc5YzAgOS4yNjMtOC4xNiAxNi44MTEtMjAuNTIgMjguMjU2bC0xLjcgMS41OGMtLjk3My45MDQtMi41NzcuOTE5LTMuNTYuMDEybC0xLjctMS41NjhDOC4xNiAzMC4yOSAwIDIyLjc0MiAwIDEzLjQ3OSAwIDUuOTMgNS44MDggMCAxMy4yIDBjMi45MjUgMCA1Ljc2Ny45NzQgOC4xMDcgMi42MzUgMS4wMjYuNzM0IDIuMzQ5IDIuMTMzIDIuMzQ5IDIuMTMzLjE5LjE5NS41MDQuMTg3LjY4NyAwIDAgMCAxLjMyNC0xLjM5OSAyLjMwOC0yLjEwM0MyOS4wMzMuOTc0IDMxLjg3NSAwIDM0LjggMFoiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iIzZiNzI4MCIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PC9zdmc+"
                      alt="heart icon"
                      className="inline w-4 h-4"
                    />
                  </span>
                </label>
              </div>

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
                  "w-full flex items-center gap-2 px-2.5 py-1.5 text-left",
                  isSignedIn
                    ? `${mutedTextColor} hover:${textColor} transition-colors duration-200`
                    : "opacity-50 cursor-not-allowed",
                  "text-[0.875em]"
                )}>
                <User size={16} />
                <span>{showPrivatePrompts ? "Show All Prompts" : "My Prompts"}</span>
                {privatePromptsCount > 0 && (
                  <span className="ml-auto text-xs bg-[#2A2A2A] text-white px-1.5 py-0.5 rounded">
                    {privatePromptsCount}
                  </span>
                )}
              </button>

              <div>
                <h3 className={cn(textColor, "text-sm font-medium mb-2")}>Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleFilterCategory(category)}
                      className={cn(
                        selectedCategories.includes(category)
                          ? "bg-[#1a1a1a] text-white"
                          : cn(mutedTextColor, `hover:${buttonBgColor}`, `hover:${textColor}`),
                        "flex items-center justify-between px-2.5 py-1.5 text-left transition-colors duration-200 rounded-md text-[0.875em]"
                      )}>
                      <span className="flex items-center gap-2">
                        {(category === "Cursor" || category === ".cursorrules") && (
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPjxwYXRoIGQ9Ik01My44IDE3LjkgMzMgOS42Yy0uNy0uMy0xLjUtLjMtMi4yIDBsLTIwLjYgOC4yYy0uOC4zLTEuMiAxLTEuMiAxLjh2MjQuN2MwIC44LjUgMS41IDEuMiAxLjhMMzEgNTQuNGMuNC4xLjcuMiAxLjEuMlYyOC44YzAtLjguNS0xLjUgMS4yLTEuOGwyMS4zLTguNWMtLjItLjMtLjUtLjUtLjgtLjZ6IiBmaWxsPSIjNmI3MjgwIiBjbGFzcz0iZmlsbC1kOWRjZTEiPjwvcGF0aD48cGF0aCBkPSJNNTUgMTkuN2MwLS40LS4yLS45LS40LTEuMkwzMy4zIDI3Yy0uOC4zLTEuMiAxLTEuMiAxLjh2MjUuOGMuNCAwIC43LS4xIDEuMS0uMmwyMC42LTguMmMuOC0uMyAxLjItMSAxLjItMS44VjE5Ljd6IiBmaWxsPSIjNmI3MjgwIiBjbGFzcz0iZmlsbC1kOWRjZTEiPjwvcGF0aD48cGF0aCBkPSJtNTAuNCAyMC4yLTE4LjMgNy4zVjUxTTEyLjkgMjAuNWwxOS4yIDciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGNsYXNzPSJzdHJva2UtZmZmZmZmIj48L3BhdGg+PC9zdmc+"
                            width="24"
                            height="24"
                            alt="Cursor icon"
                          />
                        )}
                        {category === "Convex" && (
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODU1IiBoZWlnaHQ9Ijg2MSIgdmlld0JveD0iMCAwIDg1NSA4NjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MzkuOTI0IDY3OC4xMTRDNjY3LjE1MSA2NjQuMjI2IDc4Ny4wOTQgNTk3LjYwMiA4NTMuMTM1IDQ4Ni40QzgyMS44NjMgNzYxLjQ0MyA1MTUuODM4IDkzNS4yODcgMjY2LjA0NiA4MjguNTUzQzI0My4wMjkgODE4Ljc0NCAyMjMuMjE3IDgwMi40MjggMjA5LjYyIDc4MS40NUMxNTMuNDg1IDY5NC44MTkgMTM1LjAzMiA1ODQuNTg4IDE2MS41NDYgNDg0LjU1NUMyMzcuMjk5IDYxMy4wNDQgMzkxLjMzMSA2OTEuODA4IDUzOS45MjQgNjc4LjExNFoiIGZpbGw9IiM2QjcyODAiLz4KPHBhdGggZD0iTTE1Ni44ODUgNDAzLjg0OUMxMDUuMzE0IDUyMC45NzUgMTAzLjA4IDY1OC4xMDggMTY2LjMwNSA3NzAuOTYxQy01Ni4xOTU5IDYwNi40NCAtNTMuNzY3OSAyNTQuMzgxIDE2My41ODYgOTEuNTExNEMxODMuNjkgNzYuNDU3OCAyMDcuNTgxIDY3LjUyMjggMjMyLjYzOCA2Ni4xNjMxQzMzNS42ODIgNjAuODIxNSA0NDAuMzc3IDk5Ljk2MDggNTEzLjggMTcyLjg5OEMzNjQuNjI0IDE3NC4zNTUgMjE5LjMzMyAyNjguMjY5IDE1Ni44ODUgNDAzLjg0OVoiIGZpbGw9IiM2QjcyODAiLz4KPHBhdGggZD0iTTU4NS43NTYgMjA4LjkzMkM1MTAuNDg4IDEwNS43OTEgMzkyLjY4MiAzNS41NzM1IDI2My42MDkgMzMuNDM2OEM1MTMuMTEgLTc3Ljg2MjQgODIwLjAwOCAxMDIuNTg2IDg1My40MTggMzY5LjM3NEM4NTYuNTI1IDM5NC4xNCA4NTIuNDQ2IDQxOS4zOTEgODQxLjI3OCA0NDEuNzI4Qzc5NC42NiA1MzQuNzY5IDcwOC4yMjQgNjA2LjkyOSA2MDcuMjE5IDYzMy42MzdDNjgxLjIyNCA0OTguNzM3IDY3Mi4wOTUgMzMzLjkyNSA1ODUuNzU2IDIwOC45MzJaIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo="
                            width="16"
                            height="16"
                            alt="Convex icon"
                          />
                        )}
                        <span className="truncate">{category}</span>
                      </span>
                      <span
                        className={cn(
                          selectedCategories.includes(category)
                            ? "text-gray-400"
                            : "text-[#525252]",
                          "text-sm ml-2"
                        )}>
                        {getCategoryCount(category)}
                      </span>
                    </button>
                  ))}
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
          <div>
            <h1 className="py-0 mb-8 text-center font-display text-2xl font-medium text-neutral-900 sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in [animation-delay:100ms]">
              AI Prompts and Code Gen Rules for Prompt Engineering
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {(showPrivatePrompts ? privatePrompts : sortedPrompts).map((prompt, index) => (
              <div
                key={index}
                className={cn(
                  bgColor,
                  "border",
                  borderColor,
                  "p-3 sm:p-4 transition-all duration-200 rounded-lg",
                  "shadow-[0_20px_34px_#0000000f,0_4px_10px_#0000000a,0_1px_4px_#00000008,0_1px_8px_#00000005]"
                )}>
                <div className="flex justify-between items-start text-left">
                  <div className="flex items-center gap-2">
                    {!prompt.isPublic && isSignedIn && (
                      <Lock size={14} className={cn(mutedTextColor)} />
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
                      <span className="text-xs">
                        {(prompt.likes || 0) + (likedPrompts.has(prompt._id) ? 1 : 0)}
                      </span>
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
                <PromptCard prompt={prompt} copied={copied} onCopy={copyToClipboard} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className={cn(
              bgColor,
              "p-4 sm:p-6 max-w-2xl w-full border",
              borderColor,
              "rounded-lg max-h-[90vh] overflow-y-auto"
            )}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#1A202C]">
                Add New Prompt or Rules
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className={cn(mutedTextColor, `hover:${textColor}`)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
                  Title<span className="text-[#EF442D]">* (required)</span>
                </label>
                <input
                  type="text"
                  value={newPrompt.title}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, title: e.target.value.slice(0, 54) })
                  }
                  maxLength={54}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    textColor,
                    "w-full p-3 placeholder-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  )}
                  placeholder="Enter prompt title"
                  required
                />
              </div>
              <div>
                <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={newPrompt.description}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 138) setNewPrompt({ ...newPrompt, description: text });
                  }}
                  maxLength={120}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    textColor,
                    "w-full p-3 placeholder-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  )}
                  placeholder="Enter prompt description"
                />
              </div>
              <div>
                <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
                  GitHub or Social Profile (optional)
                </label>
                <input
                  type="text"
                  value={newPrompt.githubProfile}
                  onChange={(e) => setNewPrompt({ ...newPrompt, githubProfile: e.target.value })}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    textColor,
                    "w-full p-3 placeholder-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  )}
                  placeholder="https:// Your GitHub or social profile URL"
                />
              </div>
              <div>
                <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
                  Categories<span className="text-[#EF442D]">* (required)</span> (A max of 4. Select
                  all that apply)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {CATEGORIES.map((category) => (
                    <button
                      type="button"
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        newPrompt.categories.includes(category)
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : [
                              "border-" + borderColor,
                              mutedTextColor,
                              "hover:border-[#A3A3A3]",
                            ].join(" "),
                        "p-1.5 border rounded-lg transition-colors duration-200 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                      )}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <p className={cn(mutedTextColor, "text-xs")}>
                {" "}
                <span className="text-xs">
                  <a href="https://github.com/waynesutton/promptstack/discussions/new?category=support&title=Support%20Request&body=This%20discussion%20is%20about%20a%20potential%20spam%20or%20bug%20orfeature%20request">
                    Click here to suggest a new category here.
                  </a>
                </span>
              </p>
              <div>
                <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
                  Prompt<span className="text-[#EF442D]">* (required)</span>
                </label>
                <textarea
                  value={newPrompt.prompt}
                  onChange={(e) => setNewPrompt({ ...newPrompt, prompt: e.target.value })}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    textColor,
                    "w-full p-3 placeholder-[#525252] h-32 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  )}
                  placeholder="Enter your prompt text or code gen rules or code examples"
                  required
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className={cn(mutedTextColor, "block text-sm font-medium")}>
                  Visibility
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={!isSignedIn}
                    onClick={() => setNewPrompt((prev) => ({ ...prev, isPublic: true }))}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                      newPrompt.isPublic
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : ["border-" + borderColor, mutedTextColor].join(" "),
                      !isSignedIn && "opacity-50 cursor-not-allowed"
                    )}>
                    <Globe size={16} />
                    <span>Public</span>
                  </button>
                  <button
                    type="button"
                    disabled={!isSignedIn}
                    onClick={() => setNewPrompt((prev) => ({ ...prev, isPublic: false }))}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                      !newPrompt.isPublic
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : ["border-" + borderColor, mutedTextColor].join(" "),
                      !isSignedIn && "opacity-50 cursor-not-allowed"
                    )}>
                    <Lock size={14} className={cn(mutedTextColor)} />
                    <span>Private</span>
                  </button>
                </div>
                {!isSignedIn ? (
                  <p className={cn(mutedTextColor, "text-sm")}>
                    Sign in to set prompt visibility or delete your prompts.
                  </p>
                ) : (
                  <p className={cn(mutedTextColor, "text-sm")}>
                    {newPrompt.isPublic
                      ? "Anyone can view this prompt"
                      : "Only you can view this prompt"}
                  </p>
                )}
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6 py-3 flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg">
                  <Sparkles size={20} />
                  Submit Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={cn(bgColor, "p-4 rounded-lg max-w-sm w-full border", borderColor)}>
            <div className="flex justify-between items-center mb-2">
              <h2 className={cn(textColor, "text-sm font-normal")}>
                Sign in to create private prompts or delete your own prompts.
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
      {/* footer starts here */}
      <Footer count={count} />
      {/* footer ends here */}
    </div>
  );
}

export default App;
