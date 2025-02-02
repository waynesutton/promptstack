import React, { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Search, Sun, Moon, Plus, Github, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  setIsSignInOpen?: (isOpen: boolean) => void;
}

const PromptStackLogo = ({ className }: { className?: string }) => (
  <img
    src="data:image/png;base64,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"
    alt="PromptStack Logo"
    width={32}
    height={32}
    className={className}
  />
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const showAddPrompt = currentPath === "/";

  const bgColor =
    theme === "dark"
      ? "bg-gradient-to-b from-[#ffffff] to-[#ffffff]"
      : "bg-gradient-to-b from-[#ffffff] to-[#ffffff]";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#FAF2E9]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <header className="relative h-auto w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center  gap-3">
            <a href="/">
              <PromptStackLogo className="#2A2A2A" />
            </a>
            <a href="/" className="hidden sm:block">
              <h1 className={cn(textColor, "font-inter text-[16px] leading-tight")}>
                <span className="font-normal text-[18px]">PromptStack</span>
                <br />
                <span className="font-normal text-[16px]">
                  {/* AI Prompts and Code Generation Directory for Prompt Engineering */}
                </span>
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
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
            <a
              href="https://github.com/waynesutton/PromptStack"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                textColor,
                "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
              )}>
              <Github size={16} />
              <span className="text-sm">open source</span>
            </a>
            <div className="flex items-center gap-4">
              {showAddPrompt && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={cn(
                    "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                  )}>
                  <Plus size={12} />
                  <span>Add Prompt</span>
                </button>
              )}

              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white transition-colors duration-200 text-sm rounded-lg">
                    <span className="text-[13px]">Sign in</span>
                  </button>
                </SignInButton>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <span className="md:hidden font-normal text-[18px]">
            <a href="/">PromptStack</a>
          </span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-4">
              {setSearchQuery && (
                <div className="relative">
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
              <div className="flex flex-col gap-4">
                <Link
                  to="/about"
                  className={cn(
                    textColor,
                    "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                  )}>
                  About
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
                {showAddPrompt && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={cn(
                      "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                    )}>
                    <Plus size={12} />
                    <span>Add Prompt</span>
                  </button>
                )}
                {isSignedIn ? (
                  <div className="w-fit">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white transition-colors duration-200 text-sm rounded-lg">
                      <span className="text-[13px]">Sign in</span>
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
