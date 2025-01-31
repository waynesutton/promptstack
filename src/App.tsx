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
} from "lucide-react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Link } from "@tanstack/react-router";
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
import { SignInButton, useAuth } from "@clerk/clerk-react";

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
  "Anthropic",
  "AutoHotkey",
  "Backend",
  "Bolt.new",
  "C#",
  "C++",
  "ChatGPT",
  "Claude",
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
  "Ruby on Rails",
  "Rust",
  "Shadcn UI",
  "ShipFast",
  "Solidity",
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
        <div className="flex items-center justify-between px-4 py-2 bg-[#2A2A2A] border-b border-[#343434]">
          <span className="text-[#6C6C6C] text-[12px] font-mono">prompt.txt</span>
          <div className="flex items-center gap-1">
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
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
  const likePromptMutation = useMutation(api.prompts.likePrompt);

  const createPrompt = useMutation(api.prompts.createPrompt);
  const searchResults = useQuery(api.prompts.searchPrompts, {
    searchQuery: searchQuery || undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  const prompts = searchResults || [];

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
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4EF] to-[#FFFFFF]">
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsModalOpen={setIsModalOpen}
          setIsSignInOpen={setIsSignInOpen}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 max-w-[1920px] mx-auto px-4 sm:px-6 py-8">
        <div className="w-full lg:w-64 lg:flex-none">
          <div className="lg:sticky lg:top-24">
            <div className="space-y-4">
              <button
                onClick={() =>
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                }
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ChevronDown size={16} />
                Scroll to bottom
              </button>

              <button
                disabled={true}
                onClick={() => setIsMyPromptsOpen(true)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-left opacity-50 cursor-not-allowed text-[0.875em] text-[#A3A3A3]">
                <User size={16} />
                My prompts
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
                        {category === "Cursor" && <Cube size={16} />}
                        {category === "Convex" && <Database size={16} />}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {prompts.map((prompt, index) => (
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
                  <h2
                    className={cn(textColor, "text-base sm:text-med font-normal mb-1.5 text-left")}>
                    {prompt.title}
                  </h2>
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
                Add New Prompt
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
                  Visibility (coming soon)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border opacity-50 cursor-not-allowed",
                      ["border-" + borderColor, mutedTextColor].join(" ")
                    )}>
                    <Globe size={16} />
                    <span>Public</span>
                  </button>
                  <button
                    type="button"
                    disabled
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border opacity-50 cursor-not-allowed",
                      ["border-" + borderColor, mutedTextColor].join(" ")
                    )}>
                    <Lock size={16} />
                    <span>Private</span>
                  </button>
                </div>
                <p className={cn(mutedTextColor, "text-sm")}>All prompts are currently public</p>
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
              <h2 className={cn(textColor, "text-lg font-medium")}>Coming Soon</h2>
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
          <div className={cn(bgColor, "p-4 rounded-lg max-w-sm w-full border", borderColor)}>
            <div className="flex justify-between items-center mb-2">
              <h2 className={cn(textColor, "text-lg font-medium")}>Coming Soon</h2>
              <button
                onClick={() => setIsMyPromptsOpen(false)}
                className={cn(mutedTextColor, "hover:text-white transition-colors")}>
                <X size={20} />
              </button>
            </div>
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
