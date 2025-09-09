import type { Editor } from "@tiptap/react";

function bold(editor: Editor) {
    editor.chain().focus().toggleBold().run();
}

function italic(editor: Editor) {
    editor.chain().focus().toggleItalic().run();
}

function underline(editor: Editor) {
    editor.chain().focus().toggleUnderline().run();
}

export { bold, italic, underline };
