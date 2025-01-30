import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  onCopy?: (text: string) => void;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = true,
  onCopy,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(code);
    } else {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative font-mono text-sm bg-[#1A1A1A] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2A2A2A] border-b border-[#343434]">
        <div className="flex space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[#6C6C6C] hover:text-white transition-colors">
          {copied ? (
            <>
              <IconCheck size={12} />
              <span className="text-[10px] font-mono">Copied!</span>
            </>
          ) : (
            <>
              <IconCopy size={12} />
              <span className="text-[10px] font-mono">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto p-4 text-white whitespace-pre-wrap break-words">
          {lines.map((line, i) => (
            <div key={i} className="table-row">
              {showLineNumbers && (
                <span className="table-cell text-[#666] pr-4 text-right select-none w-[2.5em] whitespace-nowrap">
                  {i + 1}
                </span>
              )}
              <span className="table-cell break-words whitespace-pre-wrap">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
}
