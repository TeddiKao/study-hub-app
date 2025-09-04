import { EditorContent } from "@tiptap/react";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import { useParams } from "react-router-dom";
import useBlocksQuery from "../hooks/useBlocksQuery.hooks";
import { useEffect } from "react";
import { useBlocksStore } from "../stores/blocks.stores";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useEditorStateStore } from "../stores/editorState.stores";
import useBlockMutations from "../hooks/useBlockMutations.hooks";
import useNotesEditor from "../hooks/useNotesEditor.hooks";
import { getSelectedNode } from "../utils/nodes.utils";

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

    const editor = useNotesEditor();

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
            const shouldUpdatetoDB =
                !isNullOrUndefined(selectedBlockId) &&
                !isNullOrUndefined(selectedBlockContent) &&
                !isNullOrUndefined(selectedBlockType) &&
                !isNullOrUndefined(selectedBlockOrder);

            const currentlySelectedNode = getSelectedNode(editor);
            const hasFocusMoved =
                currentlySelectedNode.attrs.id !== selectedBlockId;

            if (shouldUpdatetoDB && hasFocusMoved) {
                const prevSelectedNodeId = selectedBlockId;
                const prevSelectedBlockContent = selectedBlockContent;
                const prevSelectedBlockType = selectedBlockType;
                const prevSelectedBlockOrder = selectedBlockOrder;

                await handleBlockUpdate(prevSelectedNodeId!, {
                    blockType: prevSelectedBlockType!,
                    blockContent: prevSelectedBlockContent!,
                    blockOrder: prevSelectedBlockOrder!,
                });

                console.log("Block updated!");
            }

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

            const selectedNode = getSelectedNode(editor);

            updateSelectedBlockContent(selectedNode.toJSON().content);
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
