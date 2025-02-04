import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Share, Copy, User, Bug, Trash2, Lock } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CommentSection } from "../components/CommentSection";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/prompt/$slug")({
  component: PromptDetail,
});

function PromptDetail() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isSignedIn, user } = useUser();
  const { slug } = Route.useParams();
  const prompt = useQuery(api.prompts.getPromptBySlug, { slug });
  const deletePrompt = useMutation(api.prompts.deletePrompt);
  const navigate = useNavigate();

  useEffect(() => {
    if (prompt && user) {
      console.log({
        isSignedIn,
        userId: user.id,
        promptUserId: prompt.userId,
        canDelete: isSignedIn && user.id === prompt.userId,
      });
    }
  }, [isSignedIn, user, prompt]);

  if (!prompt) return <div>Loading...</div>;

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-[#222222]" : "bg-gray-100";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const getDomainFromUrl = (url: string) => {
    try {
      if (!url.startsWith("http")) return `@${url}`;
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace("www.", "");
      if (domain === "github.com") return `@${urlObj.pathname.split("/")[1]}`;
      if (domain === "twitter.com" || domain === "x.com")
        return `@${urlObj.pathname.split("/")[1]}`;
      if (domain === "linkedin.com") return `@${urlObj.pathname.split("/")[2]}`;
      return `@${urlObj.pathname.split("/")[1]}`;
    } catch {
      return url.startsWith("@") ? url : `@${url}`;
    }
  };

  const handleDeletePrompt = async (promptId: Id<"prompts">) => {
    if (!isSignedIn || !user || user.id !== prompt.userId) {
      console.error("Not authorized to delete this prompt");
      return;
    }

    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await deletePrompt({ id: promptId });
        navigate({ to: "/" });
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <HelmetProvider>
        <Helmet>
          <title>{prompt.title} - PromptStack</title>
          <meta name="description" content={prompt.description} />
          <meta property="og:title" content={`${prompt.title} - PromptStack`} />
          <meta property="og:description" content={prompt.description} />
          <meta
            property="og:image"
            content="https://promptstack.vercel.app/og-image.jpg"
          />
          <meta
            name="twitter:title"
            content={`${prompt.title} - PromptStack`}
          />
          <meta name="twitter:description" content={prompt.description} />
        </Helmet>
      </HelmetProvider>

      <div className="sticky top-0 z-50">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[810px] w-[810px] rounded-full bg-[#ffffff] opacity-60 blur-[100px]"></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/prompt/$slug"
              params={{ slug: prompt.slug }}
              search={{}}
              className="text-black hover:text-gray-800 transition-colors"
            >
              {prompt.title}
            </Link>
          </nav>

          <div
            className={cn(
              bgColor,
              "border",
              borderColor,
              "p-3 sm:p-4 rounded-lg"
            )}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                {!prompt.isPublic && isSignedIn && (
                  <Lock size={14} className={cn(mutedTextColor)} />
                )}
                <h2 className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#1A202C]">
                  {prompt.title}
                </h2>
              </div>
            </div>
            <p className={cn(mutedTextColor, "mb-3 text-xs sm:text-sm")}>
              {prompt.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-left">
              {prompt.categories.map((category, idx) => (
                <span
                  key={idx}
                  className={cn(
                    buttonBgColor,
                    mutedTextColor,
                    "inline-block px-2 py-1 text-xs sm:text-sm rounded-md text-left"
                  )}
                >
                  {category}
                </span>
              ))}
              {prompt.githubProfile && (
                <a
                  href={
                    prompt.githubProfile.startsWith("http")
                      ? prompt.githubProfile
                      : `https://github.com/${prompt.githubProfile.replace("@", "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    mutedTextColor,
                    `hover:${textColor}`,
                    "flex items-center gap-1 transition-colors duration-200 text-left"
                  )}
                >
                  <User size={16} />
                  <span className="text-xs sm:text-sm text-left">
                    {getDomainFromUrl(prompt.githubProfile)}
                  </span>
                </a>
              )}
            </div>

            <div className="mt-4">
              <SandpackProvider
                theme="dark"
                template="static"
                files={{
                  "/prompt.txt": prompt.prompt,
                }}
                options={{
                  visibleFiles: ["/prompt.txt"],
                  activeFile: "/prompt.txt",
                }}
              >
                <div className="flex items-center justify-between px-4 py-2 bg-[#2A2A2A] border-b border-[#343434]">
                  <span className="text-[#6C6C6C] text-[0px] font-mono">
                    prompt.txt
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const url = window.location.href;
                        navigator.clipboard.writeText(url);
                        alert("URL copied to clipboard!");
                      }}
                      className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200"
                    >
                      <Share size={14} />
                      <span className="text-[12px] font-mono">Share</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt)}
                      className="flex items-center gap-0.5 px-1.5 py-0.5 text-[#6C6C6C] hover:text-white transition-colors duration-200"
                    >
                      {copied === prompt.prompt ? (
                        <span className="text-[12px] font-mono">Copied!</span>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span className="text-[12px] font-mono">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <SandpackLayout>
                  <SandpackCodeEditor
                    showTabs={false}
                    showLineNumbers
                    readOnly
                    showReadOnly={false}
                    wrapContent
                    closableTabs={false}
                  />
                </SandpackLayout>
              </SandpackProvider>
            </div>
            <div className="flex items-center gap-2 pt-[10px]">
              {isSignedIn && user && prompt && prompt.userId === user.id && (
                <button
                  onClick={() => handleDeletePrompt(prompt._id)}
                  className={cn(
                    mutedTextColor,
                    "hover:text-black transition-colors flex items-center gap-1"
                  )}
                >
                  <Trash2 size={14} />
                  <span className="text-xs">Delete</span>
                </button>
              )}
              <a
                href={`https://github.com/waynesutton/promptstack/discussions/new?category=support&title=Prompt%20Spam&body=This%20discussion%20is%20about%20a%20potential%20spam%20prompt.%0A%0AReported from: ${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <Bug size={14} className={cn(mutedTextColor)} />
                <span className={cn(mutedTextColor, "text-xs")}>
                  {prompt.isPublic ? "Report bugs or spam" : "Report"}
                </span>
              </a>
            </div>
            <div className="comments mt-8">
              <CommentSection promptId={prompt._id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PromptDetail;
