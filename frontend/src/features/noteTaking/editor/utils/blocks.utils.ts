import type { BlockUpdateRequest } from "../types/blocksApi.types";
import type {
    TiptapSerializedBlock,
    TiptapSerializedBlocks,
} from "../types/blockSchema.types";

function parseSerializedBlock(block: TiptapSerializedBlock): BlockUpdateRequest {
    if (!block.attrs.id) {
        throw new Error("Block ID is missing");
    }

    if (!block.attrs.position) {
        throw new Error("Block position is missing");
    }

    if (!block.attrs.note?.id) {
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

export { parseSerializedBlocks }