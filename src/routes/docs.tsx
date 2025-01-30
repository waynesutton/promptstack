import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Command, ArrowLeft, Book, Sun, Moon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  component: About,
});

function About() {
  const { theme, toggleTheme } = useTheme();

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
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
                <Command size={24} />
              </Link>
              <h1 className={`text-2xl font-bold ${textColor}`}>About</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/prompt-guide"
                className={`px-4 py-2 ${buttonBgColor} ${buttonHoverBgColor} ${textColor} 
                         transition-colors duration-200 text-sm rounded-lg flex items-center gap-2`}>
                <Command size={16} />
                <span>Prompt Guide</span>
              </Link>
              {/* <button
                className={`px-4 py-2 ${buttonBgColor} ${buttonHoverBgColor} ${textColor} 
                         transition-colors duration-200 text-sm rounded-lg`}
              >
                Log in
              </button>
              <button
                className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                         transition-colors duration-200 text-sm rounded-lg`}
              >
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
          <div className="prose dark:prose-invert">
            <h1>About AI Prompts Directory</h1>
            <p>
              Welcome to the AI Prompts Directory. This guide will help you understand how to use
              and contribute to our platform effectively.
            </p>

            <h2>What is AI Prompts Directory?</h2>
            <p>
              AI Prompts Directory is a community-driven platform for sharing and discovering
              effective prompts for various AI models and tools. Whether you're working with
              ChatGPT, GitHub Copilot, or other AI assistants, you'll find prompts that help you get
              the most out of these tools.
            </p>

            <h2>Features</h2>
            <ul>
              <li>Browse and search through a curated collection of AI prompts</li>
              <li>Filter prompts by category and rating</li>
              <li>Share your own prompts with the community</li>
              <li>Rate and favorite prompts to help others find the best content</li>
            </ul>

            <h2>How to Use</h2>
            <h3>Browsing Prompts</h3>
            <p>You can browse prompts by:</p>
            <ul>
              <li>Using the search bar to find specific topics or keywords</li>
              <li>Filtering by categories in the sidebar</li>
              <li>Sorting by star rating</li>
            </ul>

            <h3>Contributing</h3>
            <p>To contribute your own prompts:</p>
            <ol>
              <li>Sign up for an account</li>
              <li>Click the "Add Prompt" button</li>
              <li>Fill in the prompt details and categories</li>
              <li>Submit your prompt for others to use</li>
            </ol>

            <h2>Best Practices</h2>
            <p>When creating prompts:</p>
            <ul>
              <li>Be clear and concise in your descriptions</li>
              <li>Include example use cases</li>
              <li>Specify which AI tools the prompt works best with</li>
              <li>Use appropriate categories to help others find your prompts</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className={`border-t ${borderColor} ${bgColor} py-6 sm:py-8 mt-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h4 className={`font-semibold ${textColor} mb-4`}>Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/prompt-guide"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Prompt Guide
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      API
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold ${textColor} mb-4`}>Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold ${textColor} mb-4`}>Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Status
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold ${textColor} mb-4`}>Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <p className={mutedTextColor}>
                  A collection of AI prompts to enhance your workflow
                </p>
                <span className={`hidden sm:inline ${mutedTextColor}`}>•</span>
                <p className={mutedTextColor}>Open-Source project Powered by Convex.dev</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
