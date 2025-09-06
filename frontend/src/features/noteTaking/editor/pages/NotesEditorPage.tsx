import { EditorContent } from "@tiptap/react";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlocksStore } from "../stores/blocks.stores";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import useNotesEditor from "../hooks/editor/useNotesEditor.hooks";
import useEditorSelectionUpdate from "../hooks/editor/useEditorSelectionUpdate.hooks";
import useEditorContentUpdate from "../hooks/editor/useEditorContentUpdate.hooks";
import useBlocksQuery from "../hooks/blocks/useBlocksQuery.hooks";
import { parseSerializedBlocks } from "../utils/blocks.utils";
import type { TiptapSerializedBlocks } from "../types/blockSchema.types";
import useBlockMutations from "../hooks/blocks/useBlockMutations.hooks";
import { sendBeacon } from "@/shared/utils/api.utils";
import { BACKEND_BASE, BLOCKS_BASE } from "@/app/api/api.constants";
import useLatest from "@/shared/hooks/useLatest.hooks";

function NotesEditorPage() {
    const { noteId } = useParams();
    const { data: blocks, isLoading, error } = useBlocksQuery();
    const { updateCurrentNoteId, clearCurrentNoteId } = useBlocksStore();
    const { handleBlocksBulkUpdate } = useBlockMutations();

    const blocksBulkUpdateCallbackRef = useLatest(handleBlocksBulkUpdate);
    const noteIdRef = useLatest(noteId);

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
    }, [blocks, editor]);

    useEffect(() => {
        const onBeforeUnload = () => {
            if (!editor) return;
            if (editor.isEmpty) return;

            const formattedBlocks = parseSerializedBlocks(
                editor.getJSON().content as TiptapSerializedBlocks
            );

            sendBeacon(`${BACKEND_BASE}/${BLOCKS_BASE}/bulk-update/`, {
                blocks: formattedBlocks,
            });
        };

        window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        };
    }, [editor]);

    useEffect(() => {
        return () => {
            if (isNullOrUndefined(noteIdRef.current)) return;
            if (Number.isNaN(Number(noteIdRef.current))) return;
            if (!Number.isFinite(Number(noteIdRef.current))) return;

            if (!editor) return;
            if (editor.isEmpty) return;

            blocksBulkUpdateCallbackRef.current(
                parseSerializedBlocks(
                    editor.getJSON().content as TiptapSerializedBlocks
                ),
                Number(noteIdRef.current)
            );
        };
    }, [editor]);

    useEditorSelectionUpdate(editor);
    useEditorContentUpdate(editor);

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
