import React, { useState } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MinimalTiptapEditor } from "./minimal-tiptap";
import { Content, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MessageSquare, X, Trash2 } from "lucide-react";

interface CommentSectionProps {
  promptId: string;
}

interface ThreadedComment {
  _id: string;
  content: string;
  userName: string;
  createdAt: number;
  replies?: ThreadedComment[];
}

export function CommentSection({ promptId }: CommentSectionProps) {
  const { user, isSignedIn } = useUser();
  const [comment, setComment] = useState<Content>();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<Content>();
  const comments = useQuery(api.comments.getComments, { promptId });
  const addComment = useMutation(api.comments.addComment);
  const deleteComment = useMutation(api.comments.deleteComment);

  const renderComment = (content: string) => {
    try {
      const parsedContent = JSON.parse(content);
      return generateHTML(parsedContent, [StarterKit]);
    } catch (e) {
      return content;
    }
  };

  const handleSubmit = async (e: React.FormEvent, contentToSubmit?: Content) => {
    e.preventDefault();
    const contentToSend = contentToSubmit || comment;
    if (!contentToSend || !isSignedIn) return;

    try {
      await addComment({
        promptId,
        content: JSON.stringify(contentToSend),
        userId: user.id,
        userName: user.fullName || user.username || "Anonymous",
        parentId: replyingTo || undefined,
      });
      if (replyingTo) {
        setReplyContent(undefined);
        setReplyingTo(null);
      } else {
        setComment(undefined);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      // Optionally add user-facing error handling here
    }
  };

  const organizeComments = (comments: any[]): ThreadedComment[] => {
    const commentMap = new Map();
    const roots: ThreadedComment[] = [];

    comments?.forEach((comment) => {
      commentMap.set(comment._id, { ...comment, replies: [] });
    });

    comments?.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentMap.get(comment._id));
        }
      } else {
        roots.push(commentMap.get(comment._id));
      }
    });

    return roots;
  };

  const CommentThread = ({ comment, depth = 0 }: { comment: ThreadedComment; depth?: number }) => (
    <div className={`border border-[#F9F0E7] rounded-lg p-4 ${depth > 0 ? "ml-8" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.userName}</span>
          <span className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        {isSignedIn && user.id === comment.userId && (
          <button
            onClick={() => handleDeleteComment(comment._id)}
            className="text-gray-500 hover:text-black">
            <Trash2 size={14} />
          </button>
        )}
      </div>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: renderComment(comment.content),
        }}
      />
      {isSignedIn && (
        <button
          onClick={() => setReplyingTo(comment._id)}
          className="text-sm text-gray-500 mt-2 flex items-center gap-1 hover:text-black">
          <MessageSquare size={14} />
          Reply
        </button>
      )}
      {replyingTo === comment._id && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Replying to {comment.userName}</span>
            <button
              onClick={() => {
                setReplyingTo(null);
                setReplyContent(undefined);
              }}
              className="text-gray-500 hover:text-black">
              <X size={14} />
            </button>
          </div>
          <MinimalTiptapEditor content={replyContent} onChange={setReplyContent} />
          <button
            onClick={(e) => handleSubmit(e, replyContent)}
            disabled={!replyContent}
            className="px-4 py-2 bg-[#F9F0E7] text-[#000000] rounded-med hover:bg-[#000000] hover:text-[#ffffff] transition-colors duration-200 disabled:opacity-100 disabled:cursor-not-allowed mt-2">
            Reply
          </button>
        </div>
      )}
      {comment.replies?.map((reply) => (
        <CommentThread key={reply._id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );

  const threadedComments = organizeComments(comments || []);

  return (
    <div className="space-y-4">
      <h2 className="text-normal font-normal">Prompt Feedback</h2>

      <div className="space-y-2">
        <MinimalTiptapEditor
          content={comment}
          onChange={isSignedIn ? setComment : () => {}}
          disabled={!isSignedIn}
        />

        {isSignedIn ? (
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={!comment}
            className={`px-4 py-2 bg-[#F9F0E7] text-[#000000] rounded-med hover:bg-[#000000] hover:text-[#ffffff] transition-colors duration-200 disabled:opacity-100 disabled:cursor-not-allowed`}>
            Comment
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="text-[#6C6C6C] hover:text-[#2A2A2A] transition-colors duration-200">
              Sign in to leave a comment
            </button>
          </SignInButton>
        )}
      </div>

      <div className="space-y-4">
        {threadedComments.map((comment) => (
          <CommentThread key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
