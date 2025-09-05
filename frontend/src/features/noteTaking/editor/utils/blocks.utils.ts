import type { BlockUpdateRequest } from "../types/blocksApi.types";
import type {
    TiptapSerializedBlock,
    TiptapSerializedBlocks,
} from "../types/blockSchema.types";

function parseSerializedBlock(block: TiptapSerializedBlock): BlockUpdateRequest {
    const {
        type,
        content,
        attrs: { id, position, note },
    } = block;

    return {
        id: id,
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