import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import {
  Share,
  MessageSquare,
  Copy,
  Star,
  User,
  Plus,
  Sun,
  Moon,
  Github,
  Search,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CodeEditor } from "../components/CodeEditor";
import { CodeBlock } from "../components/CodeBlock";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "@tanstack/react-router";

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

export const Route = createFileRoute("/prompt/$slug")({
  component: PromptDetail,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      slug: search.slug as string,
    };
  },
});

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

function PromptDetail() {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);
  const { slug } = Route.useParams();
  const prompt = useQuery(api.prompts.getPromptBySlug, { slug });

  if (!prompt) return <div>Loading...</div>;

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4EF] to-[#FFFFFF]">
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className={cn("min-h-screen", bgColor)}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
          <div className={cn(bgColor, "border", borderColor, "p-3 sm:p-4 rounded-lg")}>
            <div className="flex justify-between items-start">
              <h2 className={cn(textColor, "text-base sm:text-lg font-semibold mb-1.5")}>
                {prompt.title}
              </h2>
            </div>
            <p className={cn(mutedTextColor, "mb-3 text-xs sm:text-sm")}>{prompt.description}</p>
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
                  <span className="text-xs sm:text-sm text-left">
                    {getDomainFromUrl(prompt.githubProfile)}
                  </span>
                </a>
              )}
            </div>

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
                    <button
                      onClick={() => {
                        const url = window.location.href;
                        navigator.clipboard.writeText(url);
                        alert("URL copied to clipboard!");
                      }}
                      className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200">
                      <Share size={14} />
                      <span className="text-[12px] font-mono">Share</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt)}
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
            </div>
          </div>
        </div>
      </div>

      <Footer count={count} />
    </div>
  );
}

export default PromptDetail;
