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
} from "lucide-react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Link } from "@tanstack/react-router";
import { CodeEditor } from "./components/CodeEditor";
import "./fonts.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeBlock } from "./components/CodeBlock";

interface Prompt {
  title: string;
  description: string;
  prompt: string;
  categories: string[];
  stars: number;
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

const STAR_RATINGS = [
  { value: 5, label: "5 stars" },
  { value: 4, label: "4 stars" },
  { value: 3, label: "3 stars" },
  { value: 2, label: "2 stars" },
  { value: 1, label: "1 star" },
];

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const PromptCard = ({
  prompt,
  copied,
  onCopy,
}: {
  prompt: Prompt;
  copied: string | null;
  onCopy: (text: string) => void;
}) => {
  return (
    <div className="mt-4">
      <div className="rounded-lg overflow-hidden bg-[#1A1A1A] shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2A2A2A] border-b border-[#343434]">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#6C6C6C] text-[12px] font-mono text-left">prompt.txt</span>
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
        </div>
        <div className="relative">
          <pre className="overflow-x-auto p-2 text-white whitespace-pre-wrap break-words text-xs">
            {prompt.prompt.split("\n").map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-[#666] pr-4 text-right select-none w-[2.5em] whitespace-nowrap text-xs">
                  {i + 1}
                </span>
                <span className="table-cell break-all whitespace-pre-wrap">{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
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

function App() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStarRating, setSelectedStarRating] = useState<number | null>(null);
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

  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      title: "Creative Story Generator",
      description: "Generates a creative story based on given elements",
      prompt: "Write a story that includes: [element1], [element2], and [element3]",
      categories: ["chatgpt", "other"],
      stars: 5,
      githubProfile: "johndoe",
      isPublic: true,
    },
    {
      title: "Code Refactoring Assistant",
      description: "Helps refactor code for better readability",
      prompt: "Refactor this code to improve readability and maintainability: [code]",
      categories: ["cursor", "GitHub Copilot"],
      stars: 4,
      githubProfile: "janedoe",
      isPublic: true,
    },
    {
      title: "Email Composer",
      description: "Creates professional email templates",
      prompt: "Write a professional email about: [topic]",
      categories: ["bolt", "chatgpt"],
      stars: 3,
      githubProfile: "alexsmith",
      isPublic: true,
    },
  ]);

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

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("handleSubmit called");

    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) {
      alert("Please fill in all required fields (Title and Prompt)");
      return;
    }

    const slug = generateSlug(newPrompt.title);
    const newPromptWithSlug = {
      ...newPrompt,
      stars: 0,
      slug,
    };

    const updatedPrompts = [...prompts, newPromptWithSlug];
    console.log("Saving prompt:", newPromptWithSlug);
    console.log("Updated prompts:", updatedPrompts);

    // Update state and localStorage
    setPrompts(updatedPrompts);
    localStorage.setItem("prompts", JSON.stringify(updatedPrompts));

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

  const toggleStarRating = (rating: number) => {
    setSelectedStarRating((prev) => (prev === rating ? null : rating));
  };

  const getCategoryCount = (category: string) => {
    return prompts.filter((prompt) => prompt.categories.includes(category)).length;
  };

  const getStarRatingCount = (rating: number) => {
    return prompts.filter((prompt) => prompt.stars === rating).length;
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < count ? "fill-current text-yellow-400" : mutedTextColor}
        />
      ));
  };

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategories =
      selectedCategories.length === 0 ||
      prompt.categories.some((category) => selectedCategories.includes(category));

    const matchesStarRating = selectedStarRating === null || prompt.stars === selectedStarRating;

    return matchesSearch && matchesCategories && matchesStarRating;
  });

  useEffect(() => {
    setCount(prompts.length);
  }, [prompts.length]);

  useEffect(() => {
    const savedPrompts = localStorage.getItem("prompts");
    if (savedPrompts) {
      try {
        setPrompts(JSON.parse(savedPrompts));
      } catch (e) {
        console.error("Error loading prompts:", e);
      }
    }
  }, []);

  function Counter({ value }: { value: number }) {
    return (
      <div
        style={{ fontSize: 24 }}
        className="flex items-center justify-center space-x-1 overflow-hidden px-2 leading-none text-[#222222]">
        <span className="font-semibold">+</span>
        <Digit place={1000} value={value} />
        <Digit place={100} value={value} />
        <Digit place={10} value={value} />
        <Digit place={1} value={value} />
      </div>
    );
  }

  function Digit({ place, value }: { place: number; value: number }) {
    let valueRoundedToPlace = Math.floor(value / place);
    let animatedValue = useSpring(valueRoundedToPlace);

    useEffect(() => {
      animatedValue.set(valueRoundedToPlace);
    }, [animatedValue, valueRoundedToPlace]);

    return (
      <div style={{ height: 32 }} className="relative w-[1ch] tabular-nums">
        {[...Array(10).keys()].map((i) => (
          <Number key={i} mv={animatedValue} number={i} />
        ))}
      </div>
    );
  }

  function Number({ mv, number }: { mv: MotionValue; number: number }) {
    let y = useTransform(mv, (latest) => {
      let placeValue = latest % 10;
      let offset = (10 + number - placeValue) % 10;
      let memo = offset * 32;
      if (offset > 5) {
        memo -= 10 * 32;
      }
      return memo;
    });

    return (
      <motion.span
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center font-semibold text-[#222222]">
        {number}
      </motion.span>
    );
  }

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4EF] to-[#FFFFFF]">
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]">
        <header className={cn(bgColor, "border-b", borderColor)}>
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a href="/">
                  <PromptStackLogo className={mutedTextColor} />
                </a>
                <a href="/">
                  <h1 className={cn(textColor, "font-inter text-[1.00rem] leading-tight")}>
                    <span className="font-normal">promptstack.dev</span> - AI prompts + code gen
                    rules for developers.
                  </h1>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search
                    className={cn(
                      mutedTextColor,
                      "absolute left-3 top-1/2 transform -translate-y-1/2"
                    )}
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      bgColor,
                      "border",
                      borderColor,
                      textColor,
                      "w-full pl-9 pr-3 py-2 text-sm focus:border-[#A3A3A3] focus:ring-1 focus:ring-[#A3A3A3] transition-all duration-200 placeholder-[#525252] rounded-lg"
                    )}
                  />
                </div>
                <Link
                  to="/about"
                  className={cn(
                    textColor,
                    "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                  )}>
                  README
                </Link>
                <a
                  href="https://github.com/waynesutton/PromptStack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    textColor,
                    "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
                  )}>
                  <Github size={20} />
                  <span className="text-sm">open source</span>
                </a>
                <a
                  href="https://github.com/waynesutton/PromptStack/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    textColor,
                    "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  )}></a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center gap-2 transition-colors duration-200 rounded-lg text-sm">
                  <Plus size={16} />
                  <span>Add Prompt</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className={cn(
                    buttonBgColor,
                    buttonHoverBgColor,
                    textColor,
                    "p-2 transition-colors duration-200 rounded-lg"
                  )}>
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setIsSignInOpen(true)}
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white transition-colors duration-200 text-sm rounded-lg">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      {/* sidebar starts here */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <div className="w-56 flex-shrink-0">
            <div className={cn(bgColor, "border", borderColor, "p-3 rounded-lg sticky top-[88px]")}>
              <div className="space-y-6">
                <div>
                  <h3 className={cn(textColor, "font-normal text-med mb-1")}>Categories</h3>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                    }
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <ChevronDown size={16} />
                    Scroll to bottom
                  </button>

                  <div className="h-[1px] bg-[#E5E7EB] my-3" />

                  <button
                    disabled={false}
                    onClick={() => setIsMyPromptsOpen(true)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-left opacity-50 cursor-not-allowed text-[0.875em] text-[#A3A3A3]">
                    <User size={16} />
                    My prompts
                  </button>

                  <div className="h-[1px] bg-[#E5E7EB] my-3" />

                  <div className="flex flex-col gap-0.5">
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

                <div>
                  <h3 className={cn(textColor, "font-normal text-med mb-4")}>Star Rating</h3>
                  <div className="flex flex-col gap-2">
                    {STAR_RATINGS.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => toggleStarRating(value)}
                        className={cn(
                          selectedStarRating === value
                            ? "bg-[#1a1a1a] text-white"
                            : cn(mutedTextColor, `hover:${buttonBgColor}`, `hover:${textColor}`),
                          "flex items-center justify-between px-3 py-2 text-left transition-colors duration-200 rounded-md"
                        )}>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(value)}</div>
                        </div>
                        <span
                          className={cn(
                            selectedStarRating === value ? "text-gray-400" : "text-[#525252]",
                            "text-sm ml-2"
                          )}>
                          {getStarRatingCount(value)}
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
          {/* sidebar ends here */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    "p-3 sm:p-4 transition-all duration-200 rounded-lg"
                  )}>
                  <div className="flex justify-between items-start text-left">
                    <h2
                      className={cn(
                        textColor,
                        "text-base sm:text-med font-normal mb-1.5 text-left"
                      )}>
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
                    <div className={cn(mutedTextColor, "flex items-center gap-1")}>
                      {renderStars(prompt.stars)}
                    </div>
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
                  <PromptCard prompt={prompt} copied={copied} onCopy={copyToClipboard} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h3
              className="text-xl sm:text-sm text-[#222222] mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              Thanks for
            </motion.h3>
            <Counter value={count} />
            <motion.p
              className="text-lg sm:text-sm text-[#222222] mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              Prompts submitted!
            </motion.p>
          </div>
        </div>
      </div> */}

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
                  onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    textColor,
                    "w-full p-3 placeholder-[#525252] rounded-lg"
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
                  onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                  className={cn(
                    bgColor,
                    "border",
                    borderColor,
                    textColor,
                    "w-full p-3 placeholder-[#525252] rounded-lg"
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
                    "w-full p-3 placeholder-[#525252] rounded-lg"
                  )}
                  placeholder="Enter your profile URL with https://"
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
                        "p-1.5 border rounded-lg transition-colors duration-200 text-xs"
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
                    "w-full p-3 placeholder-[#525252] h-32 rounded-lg"
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

      <footer
        className={`${bgColor} border-t ${borderColor} bg-gradient-to-b from-[#F5F4EF] to-[#FFFFFF] py-6 sm:py-8 mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h4 className={`font-normal ${textColor} mb-4`}>Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                      README
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/waynesutton/PromptStack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                      Repo
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`font-normal ${textColor} mb-4`}>Stack</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://convex.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                      Convex
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.convex.dev/quickstarts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                      Bun + Tanstack Router
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`font-normal ${textColor} mb-4`}>Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://discord.gg/XcRXcWPJGG"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/waynesutton/PromptStack/discussions"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`font-normal ${textColor} mb-4`}></h4>
                <ul className="space-y-2">
                  <div className="flex flex-col items-start justify-start text-left">
                    <motion.h3
                      className={`text-xl sm:text-sm ${mutedTextColor} mb-4`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}>
                      Thanks for the
                    </motion.h3>
                    <Counter value={count} />
                    <motion.p
                      className={`text-sm sm:text-sm ${mutedTextColor} mt-4`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}>
                      prompts submitted.
                    </motion.p>
                  </div>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex text-[0.8rem]  flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <p className={mutedTextColor}>
                  <a href="https://promptstack.dev" target="_blank" rel="noopener noreferrer">
                    PromptStack
                  </a>{" "}
                  is an open source project powered by{" "}
                  <a href="https://convex.dev" target="_blank" rel="noopener noreferrer">
                    Convex.dev
                  </a>
                </p>
                <span className={`hidden sm:inline ${mutedTextColor}`}> </span>
                <p className={mutedTextColor}>
                  A searchable collection of AI prompts and code gen rules to enhance your workflow
                  for developers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
