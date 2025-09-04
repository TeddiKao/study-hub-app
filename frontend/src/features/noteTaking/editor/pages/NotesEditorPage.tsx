import { EditorContent, useEditor } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import Heading from "@tiptap/extension-heading";
import { Title } from "../extensions/Title.node";
import { Placeholder } from "@tiptap/extensions";
import { useParams } from "react-router-dom";
import useBlocksQuery from "../hooks/useBlocksQuery.hooks";
import { useEffect } from "react";
import { useBlocksStore } from "../stores/blocks.stores";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { NoteEditorParagraph } from "../extensions/Paragraph.node";
import { useEditorStateStore } from "../stores/editorState.stores";
import useBlockMutations from "../hooks/useBlockMutations.hooks";

function NotesEditorPage() {
    const { noteId } = useParams();
    const { data: blocks, isLoading, error } = useBlocksQuery();
    const { updateCurrentNoteId, clearCurrentNoteId } = useBlocksStore();
    const {
        selectedBlockId,
        selectedBlockType,
        selectedBlockContent,
        selectedBlockOrder,
        updateSelectedBlockId,
        updateSelectedBlockType,
        updateSelectedBlockContent,
        updateSelectedBlockOrder,
    } = useEditorStateStore();
    const { handleBlockUpdate } = useBlockMutations();

    const editor = useEditor({
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
                    } else if (node.type.name === "paragraph") {
                        return "Enter some text";
                    }

                    return "Enter content";
                },
            }),
        ],
    });

    useEffect(() => {
        if (!isNullOrUndefined(noteId)) {
            updateCurrentNoteId(Number(noteId));
        }

        return () => {
            clearCurrentNoteId();
        };
    }, [noteId, updateCurrentNoteId, clearCurrentNoteId]);

    useEffect(() => {
        if (!blocks) return;
        if (!editor) return;
        if (!editor.isEmpty) return;

        editor.commands.setContent({
            type: "doc",
            content: blocks,
        });
    }, [blocks]);

    useEffect(() => {
        editor?.on("selectionUpdate", async () => {
            if (!selectedBlockId) return;
            if (!selectedBlockContent) return;
            if (!selectedBlockType) return;
            if (!selectedBlockOrder) return;

            const { state } = editor;
            const { $from } = state.selection;

            const prevSelectedNodeId = selectedBlockId;
            const prevSelectedBlockContent = selectedBlockContent;
            const prevSelectedBlockType = selectedBlockType;
            const prevSelectedBlockOrder = selectedBlockOrder;

            const currentlySelectedNode = $from.parent;

            await handleBlockUpdate(prevSelectedNodeId!, {
                blockType: prevSelectedBlockType!,
                blockContent: prevSelectedBlockContent,
                blockOrder: prevSelectedBlockOrder,
            })

            updateSelectedBlockId(currentlySelectedNode.attrs.id);
            updateSelectedBlockType(currentlySelectedNode.type.name);
            updateSelectedBlockOrder(currentlySelectedNode.attrs.position);
        });

        return () => {
            editor?.off("selectionUpdate");
        };
    }, [
        editor,
        updateSelectedBlockId,
        updateSelectedBlockType,
        updateSelectedBlockOrder,
        selectedBlockId,
        selectedBlockContent,
        selectedBlockType,
        selectedBlockOrder,
    ]);

    useEffect(() => {
        editor?.on("update", async () => {
            if (!selectedBlockId) return;
            if (!selectedBlockType) return;

            const { state } = editor;
            const { $from } = state.selection;

            const selectedNode = $from.parent;

            updateSelectedBlockContent(selectedNode.toJSON());
        });

        return () => {
            editor?.off("update");
        };
    }, [
        editor,
        selectedBlockId,
        selectedBlockType,
        updateSelectedBlockContent,
    ]);

    if (isLoading) {
        return <div>Fetching blocks ...</div>;
    }

    if (error) {
        return <div>An error occurred while fetching blocks</div>;
    }

    return (
        <DashboardLayout className="gap-16">
            <div className="flex flex-col grow-1">
                <EditorContent className="notes-editor mt-16" editor={editor} />
            </div>
        </DashboardLayout>
    );
}

export default NotesEditorPage;
