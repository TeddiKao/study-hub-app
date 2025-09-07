import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import { parseSerializedBlocks } from "../../utils/blocks.utils";
import type { TiptapSerializedBlocks } from "../../types/blockSchema.types";
import useBlockMutations from "../blocks/useBlockMutations.hooks";
import useLatest from "@/shared/hooks/useLatest.hooks";

function useSaveOnNavigate(editor: Editor, noteId: number) {
    const { handleBlocksBulkUpdate } = useBlockMutations();

    const blocksBulkUpdateCallbackRef = useLatest(handleBlocksBulkUpdate);
    const noteIdRef = useLatest(noteId);

    useEffect(() => {
        return () => {
            if (isNullOrUndefined(noteIdRef.current)) return;
            if (Number.isNaN(noteIdRef.current)) return;
            if (!Number.isFinite(noteIdRef.current)) return;

            if (!editor) return;
            if (editor.isEmpty) return;

            const serializedBlocks = parseSerializedBlocks(
                editor.getJSON().content as TiptapSerializedBlocks
            );

            blocksBulkUpdateCallbackRef.current(
                serializedBlocks,
                noteIdRef.current
            );
        };
    }, [editor]);
}

export default useSaveOnNavigate;
