import { useEditor, EditorContent, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "./ui/toggle";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";

export function MinimalTiptapEditor({
  content,
  onChange,
  disabled = false,
}: {
  content: Content | undefined;
  onChange: (content: Content) => void;
  disabled?: boolean;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What do you think about this prompt?",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-[100%] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9F0E7] prose prose-sm",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editable: !disabled,
    autofocus: false,
    onCreate: ({ editor }) => {
      editor.commands.focus("end");
    },
  });

  React.useEffect(() => {
    if (content === undefined && editor) {
      editor.commands.clearContent();
    }
  }, [content, editor]);

  return (
    <div className={`flex flex-col gap-3 ${disabled ? "opacity-50" : ""}`}>
      <style>
        {`
          .ProseMirror p.is-editor-empty:first-child::before {
            content: "What do you think about this prompt?";
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
            font-size: 14px;
          }
        `}
      </style>
      <div className="flex gap-1">
        <Toggle
          size="sm"
          disabled={disabled}
          pressed={editor?.isActive("bold")}
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          disabled={disabled}
          pressed={editor?.isActive("italic")}
          onPressedChange={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          disabled={disabled}
          pressed={editor?.isActive("bulletList")}
          onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          disabled={disabled}
          pressed={editor?.isActive("orderedList")}
          onPressedChange={() => editor?.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
