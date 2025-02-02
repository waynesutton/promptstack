import React, { useState } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface CommentSectionProps {
  promptId: string;
}

export function CommentSection({ promptId }: CommentSectionProps) {
  const { user, isSignedIn } = useUser();
  const [comment, setComment] = useState("");
  const comments = useQuery(api.comments.getComments, { promptId });
  const addComment = useMutation(api.comments.addComment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !isSignedIn) return;

    try {
      await addComment({
        promptId,
        content: comment,
        userId: user.id,
        userName: user.fullName || user.username || "Anonymous",
      });
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-normal font-normal">Prompt Feedback</h2>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What do you think about this prompt?"
            className="w-full p-2 border rounded-lg resize-none"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className={`px-4 py-2 bg-[#FAF2E9] text-[#2A2A2A] rounded-sm hover:bg-[#FAF2E9]  transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}>
            Comment
          </button>
        </form>
      ) : (
        <SignInButton mode="modal">
          <button className="text-[#6C6C6C] hover:text-[#2A2A2A] transition-colors duration-200">
            Sign in to leave a comment
          </button>
        </SignInButton>
      )}

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment._id} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{comment.userName}</span>
              <span className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
