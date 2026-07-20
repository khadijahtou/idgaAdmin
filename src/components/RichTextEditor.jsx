import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-[#1E3A6D] overflow-hidden">
      <div className="flex flex-wrap gap-2 p-3 bg-[#132C58]">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>

        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="bg-[#132C58] min-h-[250px] p-4 text-white"
      />
    </div>
  );
};

export default RichTextEditor;
