import React from "react";
import { Link } from "@tanstack/react-router";
import { Search, Sun, Moon, Plus, Github } from "lucide-react";
import { useTheme } from "../ThemeContext";

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  setIsSignInOpen?: (isOpen: boolean) => void;
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

export function Header({
  searchQuery,
  setSearchQuery,
  setIsModalOpen,
  setIsSignInOpen,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const bgColor =
    theme === "dark"
      ? "bg-gradient-to-b from-[#0A0A0A] to-[#F5F5F4]"
      : "bg-gradient-to-b from-[#F5F5F4] to-[#ffffff]";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <header className={cn(bgColor, "border-b", borderColor)}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/">
              <PromptStackLogo className="#2A2A2A" />
            </a>
            <a href="/">
              <h1 className={cn(textColor, "font-inter text-[1.00rem] leading-tight")}>
                <span className="font-bold">PromptStack</span> - AI Prompts and Code Generation
                Directory for Prompt Engineering
              </h1>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {setSearchQuery && (
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
                    "w-full pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-200 placeholder-[#525252] rounded-lg"
                  )}
                />
              </div>
            )}
            <Link
              to="/about"
              className={cn(
                textColor,
                "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              )}>
              About
            </Link>
            {/* <a
              href="https://convex.link/promptstack"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                textColor,
                "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
              )}>
              <ConvexIcon className="w-5 h-5" />
              <span className="text-sm">convex</span>
            </a> */}
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
            {setIsModalOpen && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center gap-2 transition-colors duration-200 rounded-lg text-sm">
                <Plus size={16} />
                <span>Add Prompt</span>
              </button>
            )}
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
            {setIsSignInOpen && (
              <button
                onClick={() => setIsSignInOpen(true)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white transition-colors duration-200 text-sm rounded-lg">
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
