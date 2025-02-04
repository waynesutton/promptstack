import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Search, Plus, Github, Menu, X } from "lucide-react";
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

export function Header({
  searchQuery,
  setSearchQuery,
  setIsModalOpen,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
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

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <header className="relative h-auto w-full bg-gradient-to-b from-[#fff] to-[#F9EFE6]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center  gap-3">
            <a href="/">
              <PromptStackLogo className="#2A2A2A" />
            </a>
            <a href="/" className="hidden sm:block">
              <h1
                className={cn(
                  textColor,
                  "font-inter text-[16px] leading-tight"
                )}
              >
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
              )}
            >
              About
            </Link>
            <a
              href="https://github.com/waynesutton/PromptStack"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                textColor,
                "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
              )}
            >
              <Github size={16} />
              <span className="text-sm">open source</span>
            </a>
            <div className="flex items-center gap-4">
              {useModal ? (
                <button
                  onClick={() => setIsModalOpen?.(true)}
                  className={cn(
                    "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                  )}
                >
                  <Plus size={12} />
                  <span>Add Prompt</span>
                </button>
              ) : (
                <Link
                  to="/addnew"
                  className={cn(
                    "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                  )}
                >
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
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
                  )}
                >
                  About
                </Link>
                <a
                  href="https://github.com/waynesutton/PromptStack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    textColor,
                    "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
                  )}
                >
                  <Github size={20} />
                  <span className="text-sm">open source</span>
                </a>
                {useModal ? (
                  <button
                    onClick={() => setIsModalOpen?.(true)}
                    className={cn(
                      "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                    )}
                  >
                    <Plus size={12} />
                    <span>Add Prompt</span>
                  </button>
                ) : (
                  <Link
                    to="/addnew"
                    className={cn(
                      "w-160px px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg text-sm"
                    )}
                  >
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
