import type { Editor } from "@tiptap/react";
import type { MarkName } from "../types/editor.types";

function toggleMark(editor: Editor, markName: MarkName) {
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
