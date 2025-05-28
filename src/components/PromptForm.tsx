import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { Globe, Lock, Sparkles, X } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { CATEGORIES } from "../constants/categories";

interface PromptFormProps {
  isModal?: boolean;
  onClose?: () => void;
  onSuccess?: (promptId: string, slug: string) => void;
  initialData?: {
    title: string;
    description: string;
    prompt: string;
    categories: string[];
    githubProfile: string;
    isPublic: boolean;
  };
  isEditing?: boolean;
  promptId?: string;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  isModal = false,
  onClose,
  onSuccess,
  initialData,
  isEditing = false,
  promptId,
}) => {
  const { theme } = useTheme();
  const { isSignedIn } = useUser();
  const createPrompt = useMutation(api.prompts.createPrompt);
  const updatePromptMutation = useMutation(api.prompts.updatePrompt);
  const createCustomCategory = useMutation(api.prompts.createCustomCategory);
  const customCategories = useQuery(api.prompts.getUserCustomCategories) || [];

  const [newPrompt, setNewPrompt] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    prompt: initialData?.prompt || "",
    categories: initialData?.categories || [],
    githubProfile: initialData?.githubProfile || "",
    isPublic: initialData?.isPublic ?? true,
  });
  const [newCustomCategory, setNewCustomCategory] = useState("");
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close modal
      if (e.key === "Escape" && isModal && onClose) {
        onClose();
        return;
      }

      // Ctrl/Cmd + Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        const form = document.querySelector("form") as HTMLFormElement;
        if (form) {
          form.requestSubmit();
        }
        return;
      }
    };

    if (isModal) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModal, onClose]);

  const bgColor = theme === "dark" ? "bg-[#0A0A0A]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const mutedTextColor = theme === "dark" ? "text-[#A3A3A3]" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-[#1F1F1F]" : "border-gray-200";

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
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

  const handleCreateCustomCategory = async () => {
    if (!newCustomCategory.trim()) return;

    try {
      await createCustomCategory({ name: newCustomCategory.trim() });
      setNewCustomCategory("");
      setIsAddingCustomCategory(false);
    } catch (error) {
      console.error("Error creating custom category:", error);
      alert("Failed to create custom category. It may already exist.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) {
      alert("Please fill in all required fields (Title and Prompt)");
      return;
    }

    if (newPrompt.categories.length === 0) {
      alert("Please select at least one category");
      return;
    }

    const slug = generateSlug(newPrompt.title);

    try {
      if (isEditing && promptId) {
        await updatePromptMutation({
          id: promptId as any,
          title: newPrompt.title,
          description: newPrompt.description,
          prompt: newPrompt.prompt,
          categories: newPrompt.categories,
          githubProfile: newPrompt.githubProfile,
        });
        onSuccess?.(promptId, slug);
      } else {
        const createdPromptId = await createPrompt({
          title: newPrompt.title,
          description: newPrompt.description,
          prompt: newPrompt.prompt,
          categories: newPrompt.categories,
          githubProfile: newPrompt.githubProfile,
          isPublic: newPrompt.isPublic,
          slug,
        });
        onSuccess?.(createdPromptId, slug);
      }

      if (!isEditing) {
        setNewPrompt({
          title: "",
          description: "",
          prompt: "",
          categories: [],
          githubProfile: "",
          isPublic: true,
        });
      }

      if (isModal && onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving prompt:", error);
      alert("Failed to save prompt. Please try again.");
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
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
            "w-full p-2.5 placeholder-[#525252] rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
          )}
          placeholder="Enter prompt title"
          tabIndex={1}
          required
        />
      </div>

      <div>
        <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
          Description (optional)
        </label>
        <input
          type="text"
          value={newPrompt.description}
          onChange={(e) => {
            const text = e.target.value;
            if (text.length <= 138) setNewPrompt({ ...newPrompt, description: text });
          }}
          maxLength={120}
          className={cn(
            bgColor,
            "border",
            borderColor,
            textColor,
            "w-full p-2.5 placeholder-[#525252] rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
          )}
          placeholder="Enter prompt or code description"
          tabIndex={2}
        />
      </div>

      <div>
        <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
          GitHub or Social Profile (optional)
        </label>
        <input
          type="text"
          value={newPrompt.githubProfile}
          onChange={(e) => setNewPrompt({ ...newPrompt, githubProfile: e.target.value })}
          className={cn(
            bgColor,
            "border",
            borderColor,
            textColor,
            "w-full p-2.5 placeholder-[#525252] rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
          )}
          placeholder="https:// Your GitHub or social profile URL"
          tabIndex={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={cn(mutedTextColor, "block text-sm font-medium")}>
            Categories<span className="text-[#EF442D]">* (required)</span> (A max of 4. Select all
            that apply)
          </label>
          {isSignedIn && (
            <button
              type="button"
              onClick={() => setIsAddingCustomCategory(!isAddingCustomCategory)}
              className={cn(
                "text-xs px-2 py-1 rounded transition-colors",
                isAddingCustomCategory
                  ? "bg-[#1a1a1a] text-white"
                  : cn(mutedTextColor, "hover:bg-gray-100 hover:text-black")
              )}>
              {isAddingCustomCategory ? "Cancel" : "+ Add"}
            </button>
          )}
        </div>

        {isAddingCustomCategory && (
          <div className="mb-2 space-y-1.5">
            <input
              type="text"
              value={newCustomCategory}
              onChange={(e) => setNewCustomCategory(e.target.value)}
              placeholder="Enter category name"
              className={cn(
                "w-full px-2 py-1.5 text-xs border rounded",
                borderColor,
                "focus:outline-none focus:ring-1 focus:ring-black"
              )}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateCustomCategory();
                }
              }}
            />
            <button
              type="button"
              onClick={handleCreateCustomCategory}
              className="w-full bg-[#1a1a1a] text-white px-2 py-1.5 text-xs rounded hover:bg-[#2a2a2a] transition-colors">
              Create Category
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
          {[...CATEGORIES, ...customCategories.map((cc) => cc.name)].map((category, index) => (
            <button
              type="button"
              key={category}
              onClick={() => toggleCategory(category)}
              tabIndex={4}
              className={cn(
                newPrompt.categories.includes(category)
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : ["border-" + borderColor, mutedTextColor, "hover:border-[#A3A3A3]"].join(" "),
                "p-1.5 border rounded-md transition-colors duration-200 text-xs focus:outline-none focus:ring-1 focus:ring-black"
              )}>
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={cn(mutedTextColor, "block text-sm font-medium mb-1")}>
          Prompt<span className="text-[#EF442D]">* (required)</span>
        </label>
        <textarea
          value={newPrompt.prompt}
          onChange={(e) => setNewPrompt({ ...newPrompt, prompt: e.target.value })}
          className={cn(
            bgColor,
            "border",
            borderColor,
            textColor,
            "w-full p-2.5 placeholder-[#525252] h-28 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm resize-none"
          )}
          placeholder="Enter your prompt text or code gen rules or code examples"
          tabIndex={5}
          required
        />
      </div>

      {!isEditing && (
        <div className="space-y-2">
          <label className={cn(mutedTextColor, "block text-sm font-medium")}>Visibility</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!isSignedIn}
              onClick={() => setNewPrompt((prev) => ({ ...prev, isPublic: true }))}
              tabIndex={6}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md border transition-colors text-sm",
                newPrompt.isPublic
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : ["border-" + borderColor, mutedTextColor].join(" "),
                !isSignedIn && "opacity-50 cursor-not-allowed"
              )}>
              <Globe size={14} />
              <span>Public</span>
            </button>
            <button
              type="button"
              disabled={!isSignedIn}
              onClick={() => setNewPrompt((prev) => ({ ...prev, isPublic: false }))}
              tabIndex={7}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md border transition-colors text-sm",
                !newPrompt.isPublic
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : ["border-" + borderColor, mutedTextColor].join(" "),
                !isSignedIn && "opacity-50 cursor-not-allowed"
              )}>
              <Lock size={14} className={cn(mutedTextColor)} />
              <span>Private</span>
            </button>
          </div>
          {!isSignedIn ? (
            <p className={cn(mutedTextColor, "text-xs")}>
              Sign in to set prompt visibility or delete your prompts.
            </p>
          ) : (
            <p className={cn(mutedTextColor, "text-xs")}>
              {newPrompt.isPublic ? "Anyone can view this prompt" : "Only you can view this prompt"}
            </p>
          )}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          tabIndex={8}
          className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 py-2.5 flex items-center justify-center gap-2 transition-colors duration-200 rounded-md text-sm font-medium">
          <Sparkles size={16} />
          {isEditing ? "Save Changes" : "Submit Prompt"}
        </button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div
          className={cn(
            bgColor,
            "p-4 sm:p-5 max-w-2xl w-full border",
            borderColor,
            "rounded-lg max-h-[90vh] overflow-y-auto"
          )}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-['Inter',sans-serif] text-xl font-semibold text-[#1A202C]">
              {isEditing ? "Edit Prompt" : "Add New Prompt or Rules"}
            </h2>
            {onClose && (
              <button onClick={onClose} className={cn(mutedTextColor, `hover:${textColor}`)}>
                <X size={20} />
              </button>
            )}
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4 sm:p-5 w-full rounded-lg")}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-['Inter',sans-serif] text-xl font-semibold text-[#1A202C]">
          {isEditing ? "Edit Prompt" : "Add New Prompt or Rules"}
        </h2>
      </div>
      {formContent}
    </div>
  );
};
