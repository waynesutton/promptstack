import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import "./CodeEditor.css";

const lowlight = createLowlight(common);

interface CodeEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

export const CodeEditor = ({ content, onChange, editable = false }: CodeEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: `<pre><code>${content}</code></pre>`,
    editable,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const doc = editor.getHTML();
        const codeContent = doc.replace(/<[^>]*>/g, "");
        onChange(codeContent);
      }
    },
  });

  if (!editor) return null;

  return (
    <div className="prose prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
};
