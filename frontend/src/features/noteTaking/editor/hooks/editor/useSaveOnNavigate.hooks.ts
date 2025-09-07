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
            const id = Number(noteIdRef.current);
            if (!Number.isFinite(id)) return;

            if (!editor) return;
            if (editor.isEmpty) return;

            const serializedBlocks = parseSerializedBlocks(
                editor.getJSON().content as TiptapSerializedBlocks
            );

            blocksBulkUpdateCallbackRef.current(
                serializedBlocks,
                id
            );
        };
    }, [editor]);
}

export default useSaveOnNavigate;
