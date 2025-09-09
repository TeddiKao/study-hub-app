import { isNullOrUndefined } from "@/shared/utils/types.utils";
import type { BlockUpdateRequest } from "../types/blocksApi.types";
import type {
    TiptapSerializedBlock,
    TiptapSerializedBlocks,
} from "../types/blockSchema.types";
import type { Editor} from "@tiptap/react";
import type { Level } from "@tiptap/extension-heading";

function parseSerializedBlock(block: TiptapSerializedBlock): BlockUpdateRequest {
    if (!block.attrs) {
        throw new Error("Block attrs is missing");
    }
    
    if (isNullOrUndefined(block.attrs.id)) {
        throw new Error("Block ID is missing");
    }

    if (Number.isNaN(block.attrs.id) || !Number.isFinite(block.attrs.id)) {
        throw new Error("Block ID is not a number");
    }

    if (isNullOrUndefined(block.attrs.position)) {
        throw new Error("Block position is missing");
    }

    if (Number.isNaN(block.attrs.position) || !Number.isFinite(block.attrs.position)) {
        throw new Error("Block position is not a number");
    }

    if (isNullOrUndefined(block.attrs.note?.id)) {
        throw new Error("Block note is missing");
    }
    
    const {
        type,
        content,
        attrs: { id, position, note },
    } = block;

    return {
        id: id,
        blockId: id,
        type: type,
        content: content,
        position: position,
        noteId: note.id,
    }
}

function parseSerializedBlocks(
    tiptapSerializedBlocks: TiptapSerializedBlocks
) {
    return tiptapSerializedBlocks.map((block) => parseSerializedBlock(block));
}

function toggleHeading(editor: Editor, level: number) {
    editor.chain().focus().toggleHeading({ level: level as Level }).run();
}

export { parseSerializedBlocks, toggleHeading }