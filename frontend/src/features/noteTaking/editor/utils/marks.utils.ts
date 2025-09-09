import type { Editor } from "@tiptap/react";

type MarkNames = "bold" | "italic" | "underline";

function toggleMark(editor: Editor, markName: MarkNames) {
    switch (markName) {
        case "bold":
            editor.chain().focus().toggleBold().run();
            break;

        case "italic":
            editor.chain().focus().toggleItalic().run();
            break;

        case "underline":
            editor.chain().focus().toggleUnderline().run();
            break;
    }
}

export { toggleMark };
