import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import { parseSerializedBlocks } from "../../utils/blocks.utils";
import type { TiptapSerializedBlocks } from "../../types/blockSchema.types";
import useBlockMutations from "../../hooks/blocks/useBlockMutations.hooks";
import useLatest from "@/shared/hooks/useLatest.hooks";

function useNavigateSave(editor: Editor, noteId: number) {
    const { handleBlocksBulkUpdate } = useBlockMutations();
    const blocksBulkUpdateCallbackRef = useLatest(handleBlocksBulkUpdate);

    useEffect(() => {
        return () => {
            if (isNullOrUndefined(noteId)) return;
            if (Number.isNaN(noteId)) return;
            if (!Number.isFinite(noteId)) return;

            if (!editor) return;
            if (editor.isEmpty) return;

            const serializedBlocks = parseSerializedBlocks(
                editor.getJSON().content as TiptapSerializedBlocks
            );

            blocksBulkUpdateCallbackRef.current(
                serializedBlocks,
                noteId
            );
        };
    }, [editor]);
}

export default useNavigateSave;
