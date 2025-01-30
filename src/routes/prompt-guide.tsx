import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { ArrowLeft, Command, Send, User, Bot, Sun, Moon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/prompt-guide")({
  component: PromptGuide,
});

interface Message {
  type: "user" | "bot";
  content: string;
}

function PromptGuide() {
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "Hello! I can help you improve your AI prompts. Share a prompt you'd like feedback on, and I'll analyze its structure, clarity, and potential effectiveness.",
    },
  ]);
  const [input, setInput] = useState("");

  const bgColor =
    theme === "dark" ? "bg-[#0A0A0A]" : "bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";
  const buttonHoverBgColor = theme === "dark" ? "hover:bg-[#333333]" : "hover:bg-gray-200";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);

    setTimeout(() => {
      const feedback = generateFeedback(input);
      setMessages((prev) => [...prev, { type: "bot", content: feedback }]);

      setTimeout(() => {
        const improvedPrompt = generateImprovedPrompt(input);
        setMessages((prev) => [...prev, { type: "bot", content: improvedPrompt }]);
      }, 1000);
    }, 1000);

    setInput("");
  };

  const generateFeedback = (prompt: string) => {
    const hasObjective = prompt.includes("?") || prompt.includes("Please");
    const hasContext = prompt.length > 50;
    const hasSpecifics = prompt.includes("specific") || prompt.includes("exactly");
    const hasOutcomes = prompt.includes("result") || prompt.includes("output");
    const hasExamples = prompt.includes("example") || prompt.includes("like this");
    const hasFormat = prompt.includes("format") || prompt.includes("structure");
    const hasConstraints =
      prompt.includes("limit") || prompt.includes("constraint") || prompt.includes("must");

    const feedback = [
      "📊 Analysis of your prompt:\n",
      "Structure:",
      `- Clear objective: ${hasObjective ? "✅" : "❌ Could be clearer"}`,
      `- Context provided: ${hasContext ? "✅" : "❌ Could use more detail"}`,
      `- Examples included: ${hasExamples ? "✅" : "❌ Missing"}`,
      "\nClarity:",
      `- Specific instructions: ${hasSpecifics ? "✅" : "❌ Could be more specific"}`,
      `- Measurable outcomes: ${hasOutcomes ? "✅" : "❌ Consider adding expected outcomes"}`,
      `- Response format: ${hasFormat ? "✅" : "❌ Not specified"}`,
      `- Constraints/Limitations: ${hasConstraints ? "✅" : "❌ Not defined"}`,
      "\n💡 Areas for improvement:",
      !hasObjective && "• Add a clear objective or question",
      !hasContext && "• Provide more context about your requirements",
      !hasSpecifics && "• Include specific details about what you need",
      !hasOutcomes && "• Specify desired outcomes or deliverables",
      !hasExamples && "• Add examples to illustrate your expectations",
      !hasFormat && "• Define the preferred format of the response",
      !hasConstraints && "• Set clear constraints or limitations",
    ]
      .filter(Boolean)
      .join("\n");

    return feedback;
  };

  const generateImprovedPrompt = (originalPrompt: string) => {
    let improvedPrompt = originalPrompt;

    if (!improvedPrompt.includes("?") && !improvedPrompt.includes("Please")) {
      improvedPrompt = `Please ${improvedPrompt}`;
    }

    if (!improvedPrompt.includes("format") && !improvedPrompt.includes("structure")) {
      improvedPrompt +=
        "\n\nPlease provide the response in the following format:\n1. [Main points]\n2. [Detailed explanation]\n3. [Examples if applicable]";
    }

    if (!improvedPrompt.includes("limit") && !improvedPrompt.includes("constraint")) {
      improvedPrompt +=
        "\n\nConstraints:\n- Keep the response concise and focused\n- Use clear, simple language\n- Provide practical, actionable advice";
    }

    return (
      "✨ Here's an improved version of your prompt:\n\n" +
      improvedPrompt +
      "\n\n💡 This version includes clearer objectives, structured format, and specific constraints. Feel free to modify it further based on your specific needs!"
    );
  };

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
              <h1 className={`text-2xl font-bold ${textColor}`}>Prompt Guide</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/about"
                className={`${textColor} hover:text-gray-600 dark:hover:text-gray-300 
                         transition-colors duration-200 text-sm font-medium`}>
                About
              </Link>
              {/* <button
                className={`px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white 
                         transition-colors duration-200 text-sm rounded-lg`}
              >
                Log in
              </button>
              <button
                className={`px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white 
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}>
                {message.type === "bot" && (
                  <div className={`p-2 rounded-full ${buttonBgColor}`}>
                    <Bot size={20} className={textColor} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : `${buttonBgColor} ${textColor}`
                  }`}>
                  <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                </div>
                {message.type === "user" && (
                  <div className={`p-2 rounded-full ${buttonBgColor}`}>
                    <User size={20} className={textColor} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={`border-t ${borderColor} p-4`}>
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share your prompt for feedback..."
                className={`flex-1 p-3 rounded-lg ${bgColor} border ${borderColor} ${textColor} placeholder:${mutedTextColor}`}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white rounded-lg flex items-center gap-2 transition-colors duration-200">
                <Send size={20} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className={`${bgColor} py-6 sm:py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
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
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold ${textColor} mb-4`}>Stack</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://convex.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      Convex
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tanstack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mutedTextColor} hover:${textColor} transition-colors duration-200`}>
                      TanStack
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
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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

export default PromptGuide;
