import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "../ThemeContext";
import { Command, ArrowLeft, Book, Sun, Moon, Copy, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/addnew")({
  component: AddNew,
});

function AddNew() {
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
              <h4 className="text-xl font-500 mb-6">Add New Prompt</h4>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddNew;
