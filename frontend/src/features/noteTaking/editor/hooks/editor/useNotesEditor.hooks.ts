import { Document } from "@tiptap/extension-document";
import { useEditor, type EditorEvents } from "@tiptap/react";
import { Title } from "../../extensions/Title.node";
import { NoteEditorParagraph } from "../../extensions/Paragraph.node";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Heading } from "@tiptap/extension-heading";
import { Placeholder } from "@tiptap/extensions";
import { Text } from "@tiptap/extension-text";
import type { RawBlockData } from "../../types/blocksApi.types";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import useBlockMutations from "../blocks/useBlockMutations.hooks";

function useNotesEditor() {
    const { handleBlockBulkCreate } = useBlockMutations();

    async function handleOnUpdate({ editor }: EditorEvents["update"]) {
        if (!editor) return;
        if (editor.isEmpty) return;

        const createdParagraphs: RawBlockData[] = [];
        const topLevelNodes = editor.state.doc.content;

        let currentNodePosition = 0;

        topLevelNodes.forEach((node) => {
            if (node.type.name === "note_editor_paragraph") {
                const id = node.attrs.id;

                if (isNullOrUndefined(id)) {
                    createdParagraphs.push({
                        type: "note_editor_paragraph",
                        content: node.content.toJSON() ?? [],
                        position: currentNodePosition,
                        noteId: editor.state.doc.attrs.noteId,
                    })
                }

                currentNodePosition++;
            } 
        })

        if (createdParagraphs.length > 0) {
            await handleBlockBulkCreate(createdParagraphs);
        }
    }

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
                    } else if (node.type.name === "note_editor_paragraph") {
                        return "Enter some text";
                    }

                    return "Enter content";
                },
            }),
        ],
        onUpdate: async (args) => {
            handleOnUpdate(args);
        },
    });
}

export default useNotesEditor;
