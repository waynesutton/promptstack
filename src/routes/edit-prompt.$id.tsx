import React, { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

export const Route = createFileRoute('/edit-prompt/$id')({
  component: EditPrompt
});

function EditPrompt() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const prompt = useQuery(api.prompts.getPrompt, { id });
  const editPrompt = useMutation(api.prompts.editPrompt);
  const [formData, setFormData] = useState({
    title: prompt?.title || "",
    description: prompt?.description || "",
    prompt: prompt?.prompt || "",
    categories: prompt?.categories || [],
    isPublic: prompt?.isPublic || true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !prompt) return;

    try {
      await editPrompt({
        promptId: prompt._id,
        ...formData
      });
      navigate({ to: `/prompt/${prompt.slug}` });
    } catch (error) {
      console.error("Error updating prompt:", error);
    }
  };

  if (!prompt || !isSignedIn || user.id !== prompt.userId) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <h1>Edit Prompt</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields similar to create prompt form */}
      </form>
    </div>
  );
}

export default EditPrompt; 