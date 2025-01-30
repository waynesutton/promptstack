import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Command, ArrowLeft, Book, Sun, Moon, Copy, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import React from "react";
import { Header } from "../components/Header";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { theme, toggleTheme } = useTheme();

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
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <div className={`${textColor} font-inter space-y-8`}>
            <div>
              <h1 className="text-3xl font-bold mb-6">PromptStack</h1>

              <p className="mb-4">
                <strong>PromptStack</strong> is an <strong>open-source</strong> platform that
                provides a searchable collection of AI prompts and code generation Cursor rules for
                Bolt.new, Loveable, Windsurf, and Trae—designed to optimize developer workflows.
                Built with{" "}
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

              <p className="mb-8">
                PromptStack is a community-driven platform for developers to discover, share, and
                manage AI prompts and code generation rules. The goal of PromptStack is to help
                developers leverage AI tools more effectively by providing a curated collection of
                prompts that enhance productivity and code quality.
              </p>

              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>
                  Searchable Directory: Quickly find AI prompts and code-gen rules tailored to your
                  needs.
                </li>
                <li>Prompt Rating System: Rate and discover top prompts in the directory.</li>
                <li>
                  Category Organization: Prompts are organized into clear, functional categories.
                </li>
                <li>
                  GitHub Integration: Automatically link GitHub or social profiles submitted with
                  prompts.
                </li>
                <li>Carbon Copy View: View and copy prompts in a Carbon-style editor window.</li>
                <li>
                  Readme Support: Find and submit README examples for AI and code-gen projects.
                </li>
                <li>.Cursorrules: Find and submit Cursor rules for AI and code-gen projects.</li>
                <li>
                  SEO Optimized: AI tool lists, prompt engineering, and metadata for better
                  discoverability.
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Next.js - React framework for production</li>
                <li>React - JavaScript library for building user interfaces</li>
                <li>TypeScript - JavaScript with syntax for types</li>
                <li>Tailwind CSS - CSS framework</li>
                <li>Convex - Backend development platform</li>
                <li>Clerk - Authentication and user management</li>
                <li>Bun - JavaScript runtime & package manager</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Development Roadmap</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Allow prompts to be editable only by their creators</li>
                <li>Add "Prompt Threads" for multi-step prompts</li>
                <li>Add a "prompt feedback / comments" section to each prompt page</li>
                <li>All private prompts should be visible to the creator only</li>
                <li>Allow for public prompts to be visible to all users</li>
                <li>Setup sign-in with Clerk</li>
                <li>Add for private team prompts</li>
                <li>Add for public team prompts</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer
        className={`${bgColor} border-t ${borderColor} bg-gradient-to-b from-[#F5F4EF] to-[#FFFFFF] py-6 sm:py-8 mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
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
                  <a
                    href="https://github.com/waynesutton/PromptStack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${mutedTextColor} hover:${textColor} transition-colors duration-200 text-[0.8rem] font-normal`}>
                    Repo
                  </a>
                </ul>
              </div>
              <div>
                <h4 className={`font-normal  ${textColor} mb-4`}>Stack</h4>
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
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center text-[0.8rem]  sm:text-left">
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

export default About;
