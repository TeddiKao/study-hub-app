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
import useLatest from "@/shared/hooks/useLatest.hooks";
import useWindowUnloadSave from "../hooks/editor/useWindowUnloadSave.hooks";
import useSaveOnNavigate from "../hooks/editor/useSaveOnNavigate.hooks";
import useEditorAttributeUpdate from "../hooks/editor/useEditorAttributeUpdate.hooks";
import { useEditorStateStore } from "../stores/editorState.stores";

function NotesEditorPage() {
    const { noteId } = useParams();
    const { data: blocks, isLoading, error } = useBlocksQuery();
    const { updateCurrentNoteId, clearCurrentNoteId } = useBlocksStore();
    const {
        clearSelectedBlockId,
        clearSelectedBlockContent,
        clearSelectedBlockType,
        clearSelectedBlockPosition,
        clearSelectedBlockOriginalContent,
    } = useEditorStateStore();
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
        return () => {
            clearSelectedBlockId();
            clearSelectedBlockContent();
            clearSelectedBlockType();
            clearSelectedBlockPosition();
            clearSelectedBlockOriginalContent();
        };
    }, [
        clearSelectedBlockId,
        clearSelectedBlockContent,
        clearSelectedBlockType,
        clearSelectedBlockPosition,
        clearSelectedBlockOriginalContent,
    ]);

    useEffect(() => {
        if (!blocks) return;
        if (!editor) return;
        if (!editor.isEmpty) return;

        editor.commands.setContent({
            type: "doc",
            content: blocks,
        });
    }, [blocks, editor]);

    useEditorAttributeUpdate(editor);

    useWindowUnloadSave(editor, Number(noteIdRef.current));
    useSaveOnNavigate(editor, Number(noteIdRef.current));

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
