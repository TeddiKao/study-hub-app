import { Document } from "@tiptap/extension-document";
import { useEditor, type EditorEvents } from "@tiptap/react";
import { Title } from "../../extensions/Title.node";
import { NoteEditorParagraph } from "../../extensions/Paragraph.node";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extensions";
import { Text } from "@tiptap/extension-text";
import type { BulkBlockCreateRequest } from "../../types/blocksApi.types";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import useBlockMutations from "../blocks/useBlockMutations.hooks";
import { useRef } from "react";
import { getDeletedNodeIds } from "../../utils/editor.utils";
import { NoteEditorHeading } from "../../extensions/Heading.node";

function useNotesEditor() {
    const { handleBlockBulkCreate, handleBlocksBulkDelete } =
        useBlockMutations();
    const processedNodesRef = useRef(new Set<number>());

    async function handleBlockDeletion({
        editor,
        transaction,
    }: EditorEvents["update"]) {
        if (!editor) return;

        const oldDoc = transaction.before;
        const newDoc = transaction.doc;

        const deletedNodeIds = getDeletedNodeIds(oldDoc, newDoc);

        if (deletedNodeIds.size > 0) {
            await handleBlocksBulkDelete([...deletedNodeIds]);
        }
    }

    async function handleBlockCreation({ editor }: EditorEvents["update"]) {
        if (!editor) return;
        if (editor.isEmpty) return;

        const createdBlocks: BulkBlockCreateRequest[] = [];

        editor.state.doc.descendants((node, pos) => {
            if (!node.type.isBlock) {
                return;
            }

            if (
                node.type.name === NoteEditorParagraph.name ||
                node.type.name === NoteEditorHeading.name
            ) {
                const id = node.attrs.id;

                if (isNullOrUndefined(id)) {
                    if (processedNodesRef.current.has(pos)) {
                        return;
                    }

                    processedNodesRef.current.add(pos);

                    const tempBlockId = crypto.randomUUID();

                    createdBlocks.push({
                        type: NoteEditorParagraph.name,
                        content: node.content.toJSON() ?? [],
                        noteId: node.attrs?.note?.id,
                        tempBlockId: tempBlockId,
                    });

                    editor.commands.command(({ tr: transaction }) => {
                        transaction.setNodeMarkup(pos, node.type, {
                            ...node.attrs,
                            id: tempBlockId,
                        });

                        return true;
                    });
                }
            }
        });

        if (createdBlocks.length > 0) {
            await handleBlockBulkCreate(createdBlocks);
            processedNodesRef.current.clear();
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
            NoteEditorHeading.configure({ levels: [1, 2, 3] }),
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
            await handleBlockCreation(args);
            await handleBlockDeletion(args);
        },
    });
}

export default useNotesEditor;
