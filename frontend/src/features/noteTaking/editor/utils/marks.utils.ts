import type { Editor } from "@tiptap/react";

function toggleBold(editor: Editor) {
    editor.chain().focus().toggleBold().run();
}

function toggleItalic(editor: Editor) {
    editor.chain().focus().toggleItalic().run();
}

function toggleUnderline(editor: Editor) {
    editor.chain().focus().toggleUnderline().run();
}

export { toggleBold, toggleItalic, toggleUnderline };
