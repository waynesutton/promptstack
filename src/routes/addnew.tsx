import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Globe, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

const CATEGORIES = [
  ".cursorrules",
  "Angular",
  "Anthropic(Claude)",
  "AutoHotkey",
  "Backend",
  "Bolt.new",
  "C#",
  "C++",
  "ChatGPT",
  "Codeium",
  "Convex",
  "Creatr",
  "Cursor",
  "Database",
  "Deepseek",
  "Devin",
  "Django",
  "Expo",
  "Express.js",
  "Flutter",
  "Functional",
  "Github Gopilot",
  "Go",
  "Guidelines Doc",
  "HTMX",
  "JavaScript",
  "Jest",
  "Laravel",
  "Loveable",
  "MagicUI",
  "NextJS",
  "Novo Elements",
  "NuxtJS",
  "Openai",
  "Other",
  "Perplexity",
  "Prompt",
  "Python",
  "Radix UI",
  "React",
  "Readme",
  "Replit",
  "Requirements Doc",
  "Ruby on Rails",
  "Rust",
  "Shadcn UI",
  "ShipFast",
  "Solidity",
  "Structure Doc",
  "Supabase",
  "SvelteKit",
  "SwiftUI",
  "TabNine",
  "Tailwind",
  "TanStack",
  "trae",
  "Trickle",
  "Typescript",
  "v0",
  "Vue",
  "Wails.io",
  "Windsurf",
] as const;

export const Route = createFileRoute("/addnew")({
  component: AddNew,
});

function AddNew() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const createPrompt = useMutation(api.prompts.createPrompt);
  const { isSignedIn } = useUser();
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    prompt: "",
    categories: [] as string[],
    githubProfile: "",
    isPublic: true,
  });

  const bgColor =
    theme === "dark"
      ? "bg-[#0A0A0A]"
      : "bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const toggleCategory = (category: string) => {
    setNewPrompt((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      }
      if (prev.categories.length >= 4) return prev;
      return { ...prev, categories: [...prev.categories, category] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPrompt.title || !newPrompt.prompt || !newPrompt.categories.length) {
      return;
    }

    try {
      const slug = newPrompt.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const promptId = await createPrompt({
        title: newPrompt.title,
        description: newPrompt.description,
        prompt: newPrompt.prompt,
        categories: newPrompt.categories,
        githubProfile: newPrompt.githubProfile,
        isPublic: newPrompt.isPublic,
        slug,
      });

      if (promptId) {
        navigate({ to: "/prompt/$slug", params: { slug } });
      }
    } catch (error) {
      console.error("Error creating prompt:", error);
    }
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 ">
        <div className={cn("p-4 sm:p-6 w-full rounded-lg")}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#1A202C]">
              Add New Prompt or Rules
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={cn(mutedTextColor, "block text-sm font-medium mb-1")}
              >
                Title<span className="text-[#EF442D]">* (required)</span>
              </label>
              <input
                type="text"
                value={newPrompt.title}
                onChange={(e) =>
                  setNewPrompt({
                    ...newPrompt,
                    title: e.target.value.slice(0, 54),
                  })
                }
                maxLength={54}
                className={cn(
                  bgColor,
                  "border",
                  borderColor,
                  textColor,
                  "w-full p-3 placeholder-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                )}
                placeholder="Enter prompt title"
                required
              />
            </div>
            <div>
              <label
                className={cn(mutedTextColor, "block text-sm font-medium mb-1")}
              >
                Description (optional)
              </label>
              <input
                type="text"
                value={newPrompt.description}
                onChange={(e) => {
                  const text = e.target.value;
                  if (text.length <= 138)
                    setNewPrompt({ ...newPrompt, description: text });
                }}
                maxLength={120}
                className={cn(
                  bgColor,
                  "border",
                  borderColor,
                  textColor,
                  "w-full p-3 placeholder-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                )}
                placeholder="Enter prompt description"
              />
            </div>
            <div>
              <label
                className={cn(mutedTextColor, "block text-sm font-medium mb-1")}
              >
                GitHub or Social Profile (optional)
              </label>
              <input
                type="text"
                value={newPrompt.githubProfile}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, githubProfile: e.target.value })
                }
                className={cn(
                  bgColor,
                  "border",
                  borderColor,
                  textColor,
                  "w-full p-3 placeholder-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                )}
                placeholder="https:// Your GitHub or social profile URL"
              />
            </div>
            <div>
              <label
                className={cn(mutedTextColor, "block text-sm font-medium mb-1")}
              >
                Categories<span className="text-[#EF442D]">* (required)</span>{" "}
                (A max of 4. Select all that apply)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {CATEGORIES.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={cn(
                      newPrompt.categories.includes(category)
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : [
                            "border-" + borderColor,
                            mutedTextColor,
                            "hover:border-[#A3A3A3]",
                          ].join(" "),
                      "p-1.5 border rounded-lg transition-colors duration-200 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <p className={cn(mutedTextColor, "text-xs")}>
              {" "}
              <span className="text-xs">
                <a href="https://github.com/waynesutton/promptstack/discussions/new?category=support&title=Support%20Request&body=This%20discussion%20is%20about%20a%20potential%20spam%20or%20bug%20orfeature%20request">
                  Click here to suggest a new category here.
                </a>
              </span>
            </p>
            <div>
              <label
                className={cn(mutedTextColor, "block text-sm font-medium mb-1")}
              >
                Prompt<span className="text-[#EF442D]">* (required)</span>
              </label>
              <textarea
                value={newPrompt.prompt}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, prompt: e.target.value })
                }
                className={cn(
                  bgColor,
                  "border",
                  borderColor,
                  textColor,
                  "w-full p-3 placeholder-[#525252] h-32 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                )}
                placeholder="Enter your prompt text or code gen rules or code examples"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                className={cn(mutedTextColor, "block text-sm font-medium")}
              >
                Visibility
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!isSignedIn}
                  onClick={() =>
                    setNewPrompt((prev) => ({ ...prev, isPublic: true }))
                  }
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                    newPrompt.isPublic
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : ["border-" + borderColor, mutedTextColor].join(" "),
                    !isSignedIn && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Globe size={16} />
                  <span>Public</span>
                </button>
                <button
                  type="button"
                  disabled={!isSignedIn}
                  onClick={() =>
                    setNewPrompt((prev) => ({ ...prev, isPublic: false }))
                  }
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                    !newPrompt.isPublic
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : ["border-" + borderColor, mutedTextColor].join(" "),
                    !isSignedIn && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Lock size={14} className={cn(mutedTextColor)} />
                  <span>Private</span>
                </button>
              </div>
              {!isSignedIn ? (
                <p className={cn(mutedTextColor, "text-sm")}>
                  Sign in to set prompt visibility
                </p>
              ) : (
                <p className={cn(mutedTextColor, "text-sm")}>
                  {newPrompt.isPublic
                    ? "Anyone can view this prompt"
                    : "Only you can view this prompt"}
                </p>
              )}
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6 py-3 flex items-center justify-center gap-2 transition-colors duration-200 rounded-lg"
              >
                <Sparkles size={20} />
                Submit Prompt
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddNew;
