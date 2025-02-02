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
    src="data:image/svg+xml;charset=utf8,%3Csvg width='217' height='198' viewBox='0 0 217 198' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='217' height='198' rx='39.2558' fill='black'/%3E%3Cpath d='M158.895 24H58.4737C39.9867 24 25 38.9867 25 57.4737V141.158C25 159.645 39.9867 174.632 58.4737 174.632H158.895C177.382 174.632 192.368 159.645 192.368 141.158V57.4737C192.368 38.9867 177.382 24 158.895 24Z' stroke='white' stroke-width='16.7368' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M66.8418 74.2109L83.5786 90.9478L66.8418 107.685' stroke='white' stroke-width='16.7368' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M108.684 107.684H125.42' stroke='white' stroke-width='16.7368' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
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
  const showSearch = currentPath === "/";
  const useModal = currentPath === "/";

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
            {setSearchQuery && showSearch && (
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
              {useModal ? (
                <button
                  onClick={() => setIsModalOpen?.(true)}
                  className={cn(
                    "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                  )}>
                  <Plus size={12} />
                  <span>Add Prompt</span>
                </button>
              ) : (
                <Link
                  to="/addnew"
                  className={cn(
                    "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                  )}>
                  <Plus size={12} />
                  <span>Add Prompt</span>
                </Link>
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
              {setSearchQuery && showSearch && (
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
                {useModal ? (
                  <button
                    onClick={() => setIsModalOpen?.(true)}
                    className={cn(
                      "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                    )}>
                    <Plus size={12} />
                    <span>Add Prompt</span>
                  </button>
                ) : (
                  <Link
                    to="/addnew"
                    className={cn(
                      "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                    )}>
                    <Plus size={12} />
                    <span>Add Prompt</span>
                  </Link>
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
