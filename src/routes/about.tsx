import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { theme } = useTheme();

  const bgColor =
    theme === "dark"
      ? "bg-[#0A0A0A]"
      : "bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl">
          <div className={`${textColor} font-inter space-y-8`}>
            <div>
              <h4 className="text-lg font-500 mb-6">PromptStack</h4>

              <p className="text-base mb-8">
                <a
                  href="https://promptstack.dev"
                  className={`${mutedTextColor} hover:${textColor}`}
                >
                  PromptStack
                </a>{" "}
                is an open-source platform for developers to share, submit, and
                discuss AI prompts and code generation rules. It provides a
                space to collaborate on prompts and rules for tools like Cursor,
                Bolt.new, Loveable, Windsurf, Trae, Creatr, and Convex, helping
                developers streamline their workflows when building full-stack
                applications.
              </p>

              <p className="text-base mb-4">
                It's an open-source platform for discovering and sharing AI
                prompts, built with{" "}
                <a
                  href="https://convex.link/promptstackgithub"
                  className={`${mutedTextColor} hover:${textColor}`}
                >
                  Convex.dev
                </a>{" "}
                as the database and{" "}
                <a
                  href="https://tanstack.com/router/latest/docs/framework/react/overview"
                  className={`${mutedTextColor} hover:${textColor}`}
                >
                  TanStack Router
                </a>{" "}
                for client-side routing.
              </p>

              <h4 className="text-lg font-500 mb-6">Features</h4>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li className="text-base">
                  Searchable Directory: Quickly find AI prompts and code-gen
                  rules.
                </li>
                <li className="text-base">
                  Prompt Love: Like and sort top prompts in the directory.
                </li>
                <li className="text-base">
                  Category Organization: Prompts are organized into clear,
                  functional categories.
                </li>
                <li className="text-base">
                  GitHub Integration: Automatically link GitHub or social
                  profiles submitted with prompts.
                </li>
                <li className="text-base">
                  Carbon Copy View: View and copy prompts in a Carbon-style
                  editor window.
                </li>
                <li className="text-base">
                  .Cursorrules: Find and submit Cursor rules for AI and code-gen
                  projects.
                </li>
                <li className="text-base">
                  Prompt Link Sharing: Easily share prompts or cursor rules with
                  others.
                </li>
              </ul>

              <h4 className="text-lg font-500 mb-6">Tech Stack</h4>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li className="text-base">
                  Next.js - React framework for production
                </li>
                <li className="text-base">
                  React - JavaScript library for building user interfaces
                </li>
                <li className="text-base">
                  TypeScript - JavaScript with syntax for types
                </li>
                <li className="text-base">Tailwind CSS - CSS framework</li>
                <li className="text-base">
                  <a
                    href="https://convex.link/promptstackgithub"
                    className={`${mutedTextColor} hover:${textColor}`}
                  >
                    Convex
                  </a>{" "}
                  - Backend development platform
                </li>
                <li className="text-base">
                  Clerk - Authentication and user management
                </li>
                <li className="text-base">
                  Bun - JavaScript runtime & package manager
                </li>
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
