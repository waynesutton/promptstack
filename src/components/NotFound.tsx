import { Link } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";

export function NotFound() {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[810px] w-[810px] rounded-full bg-[#ffffff] opacity-60 blur-[100px]"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4">
          <div
            className={cn(
              bgColor,
              "border",
              borderColor,
              "p-8 rounded-lg text-center max-w-md w-full"
            )}>
            <div className="mb-6">
              <h1 className={cn(textColor, "text-6xl font-bold mb-4")}>404</h1>
              <h2 className={cn(textColor, "text-2xl font-semibold mb-2")}>Prompt Not Found</h2>
              <p className={cn(mutedTextColor, "text-sm")}>
                The prompt you're looking for doesn't exist or you don't have permission to view it.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                className="block w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 py-2 transition-colors duration-200 rounded-lg">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
