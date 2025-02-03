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
                <h4 className={`font-normal ${textColor} mb-4`}>Social</h4>
                <div className="flex flex-col space-y-2">
                  {/*<a
                    href="https://twitter.com/convex_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE0MV83MzYpIj4KPHBhdGggZD0iTTExLjYxNzUgNy43OTQ4TDE3LjQ3NjggMS4xMjVIMTYuMDg4OEwxMC45OTkgNi45MTUxMUw2LjkzNjggMS4xMjVIMi4yNTAzN0w4LjM5NDU1IDkuODgxNUwyLjI1MDM3IDE2Ljg3NDlIMy42MzgzNUw5LjAwOTg2IDEwLjc1OTFMMTMuMzAwOCAxNi44NzQ5SDE3Ljk4NzJNNC4xMzkzMSAyLjE0OTk5SDYuMjcxNjVMMTYuMDg3OCAxNS45MDAzSDEzLjk1NDkiIGZpbGw9IiM4QjhCOEUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNDFfNzM2Ij4KPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
                      alt=""
                      className="mr-2 w-[18px] h-[18px]"
                    />
                    Twitter
                  </a> */}
                  <a
                    href="https://discord.gg/XcRXcWPJGG"
                    className={`flex items-center ${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjI0NzcgMy4xNjY5NUMxNC4wODI1IDIuNjIxNzkgMTIuODM2NyAyLjIyNTYgMTEuNTM0MiAyQzExLjM3NDIgMi4yODkyMSAxMS4xODczIDIuNjc4MiAxMS4wNTg1IDIuOTg3NjRDOS42NzM4NyAyLjc3OTQxIDguMzAyMDEgMi43Nzk0MSA2Ljk0Mjg3IDIuOTg3NjRDNi44MTQwNCAyLjY3ODIgNi42MjI5MiAyLjI4OTIxIDYuNDYxNTIgMkM1LjE1NzYgMi4yMjU2IDMuOTEwMzIgMi42MjMyNSAyLjc0NTE0IDMuMTY5ODRDMC4zOTQ5ODIgNi43MjEyNCAtMC4yNDIxMDggMTAuMTg0NCAwLjA3NjQzNzUgMTMuNTk4NEMxLjYzNTE5IDE0Ljc2MjUgMy4xNDU4MSAxNS40Njk2IDQuNjMwOTMgMTUuOTMyM0M0Ljk5NzYyIDE1LjQyNzcgNS4zMjQ2NSAxNC44OTEyIDUuNjA2MzggMTQuMzI1OEM1LjA2OTgxIDE0LjEyMTkgNC41NTU5IDEzLjg3MDMgNC4wNzAzMSAxMy41NzgyQzQuMTk5MTMgMTMuNDgyOCA0LjMyNTE0IDEzLjM4MyA0LjQ0Njg5IDEzLjI4MDNDNy40MDg2NSAxNC42NjU2IDEwLjYyNjcgMTQuNjY1NiAxMy41NTMxIDEzLjI4MDNDMTMuNjc2MiAxMy4zODMgMTMuODAyMiAxMy40ODI4IDEzLjkyOTYgMTMuNTc4MkMxMy40NDI2IDEzLjg3MTcgMTIuOTI3MyAxNC4xMjMzIDEyLjM5MDcgMTQuMzI3M0MxMi42NzI0IDE0Ljg5MTIgMTIuOTk4MSAxNS40MjkxIDEzLjM2NjIgMTUuOTMzN0MxNC44NTI3IDE1LjQ3MSAxNi4zNjQ3IDE0Ljc2MzkgMTcuOTIzNSAxMy41OTg0QzE4LjI5NzMgOS42NDA3MyAxNy4yODUgNi4yMDkzNCAxNS4yNDc3IDMuMTY2OTVaTTYuMDA5ODggMTEuNDk4OUM1LjEyMDc5IDExLjQ5ODkgNC4zOTE2NiAxMC42Njg4IDQuMzkxNjYgOS42NTgwOEM0LjM5MTY2IDguNjQ3MzIgNS4xMDUyMiA3LjgxNTg3IDYuMDA5ODggNy44MTU4N0M2LjkxNDU3IDcuODE1ODcgNy42NDM2NyA4LjY0NTg2IDcuNjI4MSA5LjY1ODA4QzcuNjI5NTEgMTAuNjY4OCA2LjkxNDU3IDExLjQ5ODkgNi4wMDk4OCAxMS40OTg5Wk0xMS45OTAxIDExLjQ5ODlDMTEuMTAxIDExLjQ5ODkgMTAuMzcxOCAxMC42Njg4IDEwLjM3MTggOS42NTgwOEMxMC4zNzE4IDguNjQ3MzIgMTEuMDg1NCA3LjgxNTg3IDExLjk5MDEgNy44MTU4N0MxMi44OTQ3IDcuODE1ODcgMTMuNjIzOCA4LjY0NTg2IDEzLjYwODMgOS42NTgwOEMxMy42MDgzIDEwLjY2ODggMTIuODk0NyAxMS40OTg5IDExLjk5MDEgMTEuNDk4OVoiIGZpbGw9IiM4QjhCOEUiLz4KPC9zdmc+Cg=="
                      alt=""
                      className="mr-2 w-[18px] h-[18px]"
                    />
                    Discord
                  </a>
                  <a
                    href="https://www.youtube.com/@convex-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzLjMgNy4zYzAtLjItLjMtMS44LTEtMi41LS45LTEtMS45LTEuMS0yLjQtMS4xaC0uMWMtMy4xLS4yLTcuNy0uMi03LjgtLjIgMCAwLTQuNyAwLTcuOC4yaC0uMWMtLjUgMC0xLjUuMS0yLjQgMS4xLS43LjgtMSAyLjQtMSAyLjYgMCAuMS0uMiAxLjktLjIgMy44djEuN2MwIDEuOS4yIDMuNy4yIDMuOCAwIC4yLjMgMS44IDEgMi41LjguOSAxLjggMSAyLjQgMS4xaC4zYzEuOC4yIDcuMy4yIDcuNS4yIDAgMCA0LjcgMCA3LjgtLjJoLjFjLjUtLjEgMS41LS4yIDIuNC0xLjEuNy0uOCAxLTIuNCAxLTIuNiAwLS4xLjItMS45LjItMy44di0xLjdjLjEtMS44LS4xLTMuNy0uMS0zLjh6bS03LjQgNC45LTYgMy4yYy0uMSAwLS4xLjEtLjIuMXMtLjIgMC0uMi0uMWMtLjEtLjEtLjItLjItLjItLjRWOC41YzAtLjIuMS0uMy4yLS40cy4zLS4xLjUgMGw2IDMuMmMuMi4xLjMuMi4zLjRzLS4yLjQtLjQuNXoiIGZpbGw9IiM2YjcyODAiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg=="
                      alt="Convex YouTube"
                      className="mr-2 w-[18px] h-[18px]"
                    />
                    YouTube
                  </a>
                  {/* <a
                    href="https://bsky.app/profile/convex.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuOTAxNzQgMi4wNjY4MUM1Ljk2NTM5IDMuNjE2MDcgOC4xODUwOSA2Ljc1NzMzIDkuMDAwMDUgOC40NDMxMkM5LjgxNTA3IDYuNzU3NDYgMTIuMDM0NiAzLjYxNjA0IDE0LjA5ODQgMi4wNjY4MUMxNS41ODc0IDAuOTQ4OTIgMTggMC4wODM5NjMxIDE4IDIuODM2M0MxOCAzLjM4NTk4IDE3LjY4NDggNy40NTM5IDE3LjUgOC4xMTQzMUMxNi44NTc1IDEwLjQxMDQgMTQuNTE2MiAxMC45OTYgMTIuNDMzNyAxMC42NDE1QzE2LjA3NCAxMS4yNjExIDE3IDEzLjMxMzMgMTUuMDAwMSAxNS4zNjU2QzExLjIwMTggMTkuMjYzMiA5LjU0MDg2IDE0LjM4NzYgOS4xMTUwNyAxMy4xMzg0QzkuMDM3MDQgMTIuOTA5MyA5LjAwMDU0IDEyLjgwMjIgOSAxMi44OTMzQzguOTk5NDYgMTIuODAyMiA4Ljk2Mjk1IDEyLjkwOTMgOC44ODQ5MyAxMy4xMzg0QzguNDU5MzMgMTQuMzg3NiA2Ljc5ODQgMTkuMjYzMyAyLjk5OTkgMTUuMzY1NkMwLjk5OTkyNSAxMy4zMTMzIDEuOTI1OTYgMTEuMjYxIDUuNTY2MzQgMTAuNjQxNUMzLjQ4MzY5IDEwLjk5NiAxLjE0MjQgMTAuNDEwMyAwLjQ5OTk5NCA4LjExNDMxQzAuMzE1MTQ3IDcuNDUzODQgMCAzLjM4NTkyIDAgMi44MzYzQzAgMC4wODM5NjMxIDIuNDEyNjcgMC45NDg5MiAzLjkwMTYzIDIuMDY2ODFIMy45MDE3NFoiIGZpbGw9IiM4QjhCOEUiLz4KPC9zdmc+Cg=="
                      alt=""
                      className="mr-2 w-[18px] h-[18px]"
                    />
                    Bluesky
                  </a> */}
                  <a
                    href="https://github.com/get-convex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE0Nl8xMDA3KSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOS4wMDAwMiAwQzQuMDI3NSAwIDAgNC4xMjkzOCAwIDkuMjI3NjZDMCAxMy4zMTA5IDIuNTc2MjUgMTYuNzU5OCA2LjE1Mzc2IDE3Ljk4MjRDNi42MDM3NiAxOC4wNjMxIDYuNzcyNTEgMTcuNzg2MyA2Ljc3MjUxIDE3LjU0NDFDNi43NzI1MSAxNy4zMjUgNi43NjEyNiAxNi41OTgyIDYuNzYxMjYgMTUuODI1NUM0LjUwMDAxIDE2LjI1MjIgMy45MTUwMSAxNS4yNjAyIDMuNzM1MDEgMTQuNzQxMkMzLjYzMzc2IDE0LjQ3NTkgMy4xOTUwMSAxMy42NTY5IDIuODEyNSAxMy40Mzc4QzIuNDk3NTEgMTMuMjY0OCAyLjA0NzUgMTIuODM4IDIuODAxMjYgMTIuODI2NEMzLjUxMDAxIDEyLjgxNDkgNC4wMTYyNiAxMy40OTU1IDQuMTg1MDEgMTMuNzcyM0M0Ljk5NTAxIDE1LjE2OCA2LjI4ODc2IDE0Ljc3NTggNi44MDYyNiAxNC41MzM2QzYuODg1MDIgMTMuOTMzNyA3LjEyMTI3IDEzLjUzIDcuMzgwMDEgMTMuMjk5NEM1LjM3NzUxIDEzLjA2ODcgMy4yODUgMTIuMjcyOCAzLjI4NSA4Ljc0MzIxQzMuMjg1IDcuNzM5NyAzLjYzMzc2IDYuOTA5MjEgNC4yMDc1MSA2LjI2MzI3QzQuMTE3NTEgNi4wMzI1OCAzLjgwMjUxIDUuMDg2NzUgNC4yOTc1MSAzLjgxNzk0QzQuMjk3NTEgMy44MTc5NCA1LjA1MTI2IDMuNTc1NzIgNi43NzI1MSA0Ljc2Mzc4QzcuNDkyNTIgNC41NTYxNiA4LjI1NzUyIDQuNDUyMzUgOS4wMjI1MSA0LjQ1MjM1QzkuNzg3NTIgNC40NTIzNSAxMC41NTI2IDQuNTU2MTYgMTEuMjcyNSA0Ljc2Mzc4QzEyLjk5MzggMy41NjQxOSAxMy43NDc1IDMuODE3OTQgMTMuNzQ3NSAzLjgxNzk0QzE0LjI0MjUgNS4wODY3NSAxMy45Mjc2IDYuMDMyNTggMTMuODM3NSA2LjI2MzI3QzE0LjQxMTMgNi45MDkyMSAxNC43NiA3LjcyODE3IDE0Ljc2IDguNzQzMjFDMTQuNzYgMTIuMjg0NCAxMi42NTYzIDEzLjA2ODcgMTAuNjUzOCAxMy4yOTk0QzEwLjk4IDEzLjU4NzcgMTEuMjYxMyAxNC4xNDE0IDExLjI2MTMgMTUuMDA2NUMxMS4yNjEzIDE2LjI0MDYgMTEuMjUgMTcuMjMyNiAxMS4yNSAxNy41NDQxQzExLjI1IDE3Ljc4NjMgMTEuNDE4NyAxOC4wNzQ3IDExLjg2ODggMTcuOTgyNEMxMy42NTU0IDE3LjM2MzkgMTUuMjA3OSAxNi4xODY2IDE2LjMwNzggMTQuNjE2MUMxNy40MDc3IDEzLjA0NTcgMTcuOTk5NSAxMS4xNjExIDE4IDkuMjI3NjZDMTggNC4xMjkzOCAxMy45NzI1IDAgOS4wMDAwMiAwWiIgZmlsbD0iIzkzOTM5MyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE0Nl8xMDA3Ij4KPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
                      alt=""
                      className="mr-2 w-[18px] h-[18px]"
                    />
                    GitHub
                  </a>
                </div>
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
                  AI Prompts and Code Generation Rules for Prompt Engineering.{" "}
                  <span className="ml-[20px]">
                    Disclaimer: All trademarks belong to their respective owners.
                  </span>
                </p>
              </div>
            </div>
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
