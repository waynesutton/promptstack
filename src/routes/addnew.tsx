import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PromptForm } from "../components/PromptForm";

export const Route = createFileRoute("/addnew")({
  component: AddNew,
});

function AddNew() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const bgColor =
    theme === "dark" ? "bg-[#0A0A0A]" : "bg-gradient-to-b from-[#FBFBFB] to-[#FFFFFF]";

  const handleSuccess = (promptId: string, slug: string) => {
    navigate({ to: "/prompt/$slug", params: { slug } });
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 ">
        <PromptForm onSuccess={handleSuccess} />
      </main>

      <Footer />
    </div>
  );
}

export default AddNew;
