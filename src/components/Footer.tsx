import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { useRouter } from "@tanstack/react-router";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { ConvexIcon } from "./ConvexIcon";

interface FooterProps {
  count?: number;
}

function Counter({ value }: { value: number }) {
  return (
    <div
      style={{ fontSize: 24 }}
      className="flex items-center justify-center space-x-1 overflow-hidden px-2 leading-none text-[#222222]">
      <span className="font-semibold">+</span>
      <div className="tabular-nums">{value}</div>
    </div>
  );
}

export function Footer({ count = 0 }: FooterProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const isHomePage = router.history.location.pathname === "/";
  const [showPopup, setShowPopup] = React.useState(true);

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";

  return (
    <>
      <footer
        className={`${bgColor}  bg-gradient-to-b from-[#F9EFE6] to-[#ffffff] py-6 sm:py-8 mt-auto`}>
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
                      About
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
                      href="https://convex.link/promptstack"
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
              {isHomePage && (
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
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex text-[0.8rem] flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <p className={mutedTextColor}>
                  <a href="https://promptstack.dev" target="_blank" rel="noopener noreferrer">
                    PromptStack
                  </a>{" "}
                  is an open source project powered by{" "}
                  <a
                    href="https://convex.link/promptstack"
                    target="_blank"
                    rel="noopener noreferrer">
                    Convex.dev.
                  </a>
                </p>
                <span className={`hidden sm:inline ${mutedTextColor}`}> </span>
                <p className={mutedTextColor}>
                  AI Prompts and Code Generation Rules for Prompt Engineering .
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Disclaimer: All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </footer>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <a
            href="https://convex.link/promptstack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm hover:text-gray-300 transition-colors duration-200 flex items-center gap-2">
            Powered by
            <ConvexIcon className="w-5 h-5 text-white" />
            <span className="text-sm">convex</span>
          </a>
          <button
            onClick={() => setShowPopup(false)}
            className="text-white hover:text-gray-300 transition-colors">
            <X size={12} />
          </button>
        </div>
      )}
    </>
  );
}
