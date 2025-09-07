import { useEffect } from "react";
import type { Editor } from "@tiptap/react";
import { parseSerializedBlocks } from "../../utils/blocks.utils";
import { BACKEND_BASE, BLOCKS_BASE } from "@/app/api/api.constants";
import { sendBeacon } from "@/shared/utils/api.utils";
import type { TiptapSerializedBlocks } from "../../types/blockSchema.types";

function useWindowUnloadSave(editor: Editor | null, noteId: number) {
    useEffect(() => {
        const onBeforeUnload = () => {
            if (!editor) return;
            if (editor.isEmpty) return;
            if (Number.isNaN(noteId)) return;
            if (!Number.isFinite(noteId)) return;

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
    }, [editor, noteId]);
}

export default useWindowUnloadSave;
