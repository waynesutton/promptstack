import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Command, ArrowLeft, Book, Sun, Moon, Copy, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import React from "react";

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
      <header className={`${bgColor} border-b ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 ${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                <ArrowLeft size={20} />
                <FileText size={32} className={mutedTextColor} />
              </Link>
              <h1 className={`${textColor} text-sm font-medium`}>About</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* <button
                className={`px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white 
                         transition-colors duration-200 text-sm rounded-lg`}>
                Log in
              </button>
              <button
                className={`px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white 
                         transition-colors duration-200 text-sm rounded-lg`}>
                Sign up
              </button> */}
              <button
                onClick={toggleTheme}
                className={`p-3 ${buttonBgColor} ${buttonHoverBgColor} ${textColor} 
                         transition-colors duration-200 rounded-lg`}>
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <div className={`${textColor} font-inter space-y-8`}>
            <div>
              <h1 className="text-3xl font-bold mb-6">PromptStack</h1>
              <p className="mb-4">
                <strong>PromptHub</strong> is an <strong>open-source project</strong> that provides
                a searchable collection of AI prompts and code generation rules to enhance developer
                workflows. Built with{" "}
                <a href="https://docs.convex.dev/" className="text-blue-600 hover:underline">
                  Convex.dev
                </a>{" "}
                as the database and{" "}
                <a
                  href="https://tanstack.com/router/latest/docs/framework/react/overview"
                  className="text-blue-600 hover:underline">
                  TanStack Router
                </a>{" "}
                for client-side routing.
              </p>
              <p className="mb-4">
                PromptStack is a community-driven platform for developers to discover, share, and
                manage AI prompts and code generation rules.
              </p>
              <p className="mb-4">
                Our mission is to help developers leverage AI tools more effectively by providing a
                curated collection of prompts that enhance productivity and code quality.
              </p>
              <p className="mb-4">
                Whether you're using GitHub Copilot, ChatGPT, Claude, or other AI assistants, you'll
                find valuable prompts to improve your workflow.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Searchable Directory</strong>: Quickly find AI prompts and code-gen rules
                  tailored to your needs.
                </li>
                <li>
                  <strong>Prompt Rating System</strong>: Rate and discover top prompts in the
                  directory.
                </li>
                <li>
                  <strong>Private & Public Prompts</strong>: Option to keep prompts private or share
                  them publicly.
                </li>
                <li>
                  <strong>Category Organization</strong>: Prompts are organized into clear,
                  functional categories.
                </li>
                <li>
                  <strong>GitHub Integration</strong>: Automatically link GitHub profiles submitted
                  with prompts.
                </li>
                <li>
                  <strong>Carbon Copy View</strong>: View and copy prompts in a Carbon-style editor
                  window.
                </li>
                <li>
                  <strong>Readme Support</strong>: Find and submit README examples for AI and
                  code-gen projects.
                </li>
                <li>
                  <strong>Developer Tools</strong>: Built-in roadmaps, prompt feedback, and
                  engineering specs documentation.
                </li>
                <li>
                  <strong>SEO Optimized</strong>: AI tool lists, prompt engineering insights, and
                  metadata for better discoverability.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <p className="mb-4">
                <strong>PromptStack</strong> is powered by:
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  <a href="https://docs.convex.dev/" className="text-blue-600 hover:underline">
                    Convex.dev
                  </a>
                </h3>
                <p className="mb-4">
                  Convex.dev provides a serverless database and backend that makes building reactive
                  applications easy. It supports real-time updates, ensuring a seamless user
                  experience.
                </p>
                <p className="mb-2">Learn more about Convex:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <a
                      href="https://docs.convex.dev/understanding/"
                      className="text-blue-600 hover:underline">
                      Understanding Convex
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.convex.dev/understanding/best-practices/"
                      className="text-blue-600 hover:underline">
                      Best Practices
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.convex.dev/understanding/best-practices/typescript"
                      className="text-blue-600 hover:underline">
                      TypeScript Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <a
                    href="https://tanstack.com/router/latest/docs/framework/react/overview"
                    className="text-blue-600 hover:underline">
                    TanStack Router
                  </a>
                </h3>
                <p>
                  TanStack Router is a powerful, type-safe router for React that ensures smooth
                  navigation across PromptStack's pages.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
              <h3 className="text-xl font-semibold mb-2">Installation</h3>
              <p className="mb-4">Clone the repository and install dependencies:</p>
              <pre className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
                <code>
                  git clone https://github.com/your-repo/PromptStack cd PromptStack npm install
                </code>
              </pre>
              <h3 className="text-xl font-semibold mb-2">Running the App</h3>
              <p className="mb-4">Start the development server:</p>
              <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                <code>npm run dev</code>
              </pre>
              <p>
                Open your browser and navigate to{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Planned Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Add support for prompt threading, showing only the first in listings.</li>
                <li>Enable sidebar floating for better navigation.</li>
                <li>Introduce a footer navigation section with links to Docs and About pages.</li>
                <li>Update prompt submission cards to a three-column layout.</li>
                <li>
                  Add icons (e.g., cube for Cursor, database for Convex) for better category
                  visuals.
                </li>
                <li>Improve SEO with AI tools listing, prompt engineering texts, and meta tags.</li>
                <li>Allow users to preview, copy, and share prompts directly from prompt cards.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Development Roadmap</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>Design Enhancements</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      Update site design inspired by{" "}
                      <a
                        href="https://www.magicpatterns.com/"
                        className="text-blue-600 hover:underline">
                        MagicPatterns
                      </a>
                      .
                    </li>
                    <li>Create Carbon-style views for better readability of prompts.</li>
                  </ul>
                </li>
                <li>
                  <strong>User Features</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Allow prompts to be editable only by their creators.</li>
                    <li>Add "Prompt Threads" for multi-step prompts.</li>
                  </ul>
                </li>
                <li>
                  <strong>Documentation</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Add an About page in both markdown and readme formats.</li>
                    <li>Provide a prompt help page and developer roadmaps in the Docs section.</li>
                  </ul>
                </li>
                <li>
                  <strong>SEO Improvements</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Add meta tags and Open Graph (OG) images.</li>
                    <li>Write detailed SEO text about prompt engineering and feedback.</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contributing</h2>
              <p className="mb-4">
                We welcome contributions from the community! Feel free to submit a pull request or
                open an issue to report bugs, suggest features, or provide feedback.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">License</h2>
              <p className="mb-4">
                This project is licensed under the MIT License. See the{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">LICENSE</code> file for details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Links</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a href="https://promptstack.dev" className="text-blue-600 hover:underline">
                    Website
                  </a>
                </li>
                <li>
                  <a href="https://promptstack.dev/docs" className="text-blue-600 hover:underline">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="https://docs.convex.dev/" className="text-blue-600 hover:underline">
                    Convex.dev Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://tanstack.com/router/latest/docs/framework/react/overview"
                    className="text-blue-600 hover:underline">
                    TanStack Router Documentation
                  </a>
                </li>
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
