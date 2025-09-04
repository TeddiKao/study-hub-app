import { Document } from "@tiptap/extension-document";
import { useEditor } from "@tiptap/react";
import { Title } from "../../extensions/Title.node";
import { NoteEditorParagraph } from "../../extensions/Paragraph.node";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Heading } from "@tiptap/extension-heading";
import { Placeholder } from "@tiptap/extensions";
import { Text } from "@tiptap/extension-text";

function useNotesEditor() {
    return useEditor({
        extensions: [
            Document,
            Title,
            NoteEditorParagraph,
            Text,
            Bold,
            Italic,
            Underline,
            Heading.configure({ levels: [1, 2, 3] }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === "title") {
                        return "Enter title";
                    } else if (node.type.name === "noteEditorParagraph") {
                        return "Enter some text";
                    }

                    return "Enter content";
                },
            }),
        ],
    });
}

export default useNotesEditor;
