import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Command, ArrowLeft, Book, Sun, Moon, Copy, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bgColor =
    theme === "dark" ? "bg-[#0A0A0A]" : "bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]">
        <Header setIsModalOpen={setIsModalOpen} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <div className={`${textColor} font-inter space-y-8`}>
            <div>
              <h4 className="text-xl font-500 mb-6">PromptStack</h4>

              <p className="text-base mb-8">
                PromptStack is an open-source tool that helps developers manage and version control
                their AI prompts. It treats prompts as code, allowing teams to collaborate, test,
                and iterate on prompts using familiar Git workflows. The system lets you organize
                prompts into reusable components, track changes over time, and test different
                variations to optimize performance. You can run prompts against various AI models
                (like GPT-4, Claude, etc.) and compare results. It's particularly useful for teams
                building AI applications who need a systematic way to maintain and improve their
                prompt engineering efforts.
              </p>

              <p className="text-base mb-4">
                PromptStack works with Anthropic Claude, OpenAI GPTCursor,GitHub Copilot, Codeium,
                and other AI tools. It's an open-source platform for discovering and sharing
                prompts, built with{" "}
                <a
                  href="https://convex.link/promptstackgithub"
                  className={`${mutedTextColor} hover:${textColor}`}>
                  Convex.dev
                </a>{" "}
                as the database and{" "}
                <a
                  href="https://tanstack.com/router/latest/docs/framework/react/overview"
                  className={`${mutedTextColor} hover:${textColor}`}>
                  TanStack Router
                </a>{" "}
                for client-side routing.
              </p>

              <h4 className="text-xl font-500 mb-6">Features</h4>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li className="text-base">
                  Searchable Directory: Quickly find AI prompts and code-gen rules tailored to your
                  needs.
                </li>
                <li className="text-base">
                  Prompt Rating System: Rate and discover top prompts in the directory.
                </li>
                <li className="text-base">
                  Category Organization: Prompts are organized into clear, functional categories.
                </li>
                <li className="text-base">
                  GitHub Integration: Automatically link GitHub or social profiles submitted with
                  prompts.
                </li>
                <li className="text-base">
                  Carbon Copy View: View and copy prompts in a Carbon-style editor window.
                </li>
                <li className="text-base">
                  Readme Support: Find and submit README examples for AI and code-gen projects.
                </li>
                <li className="text-base">
                  .Cursorrules: Find and submit Cursor rules for AI and code-gen projects.
                </li>
                <li className="text-base">
                  SEO Optimized: AI tool lists, prompt engineering, and metadata for better
                  discoverability.
                </li>
              </ul>

              <h4 className="text-xl font-500 mb-6">Tech Stack</h4>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li className="text-base">Next.js - React framework for production</li>
                <li className="text-base">
                  React - JavaScript library for building user interfaces
                </li>
                <li className="text-base">TypeScript - JavaScript with syntax for types</li>
                <li className="text-base">Tailwind CSS - CSS framework</li>
                <li className="text-base">
                  <a
                    href="https://convex.link/promptstackgithub"
                    className={`${mutedTextColor} hover:${textColor}`}>
                    Convex
                  </a>{" "}
                  - Backend development platform
                </li>
                <li className="text-base">Clerk - Authentication and user management</li>
                <li className="text-base">Bun - JavaScript runtime & package manager</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
