import type {
    Block,
    TiptapSerializedBlock,
    TiptapSerializedBlocks,
} from "../types/blockSchema.types";

function parseSerializedBlock(block: TiptapSerializedBlock): Block {
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
        note: note,
    }
}

function parseSerializedBlocks(
    tiptapSerializedBlocks: TiptapSerializedBlocks
) {
    return tiptapSerializedBlocks.map((block) => parseSerializedBlock(block));
}

export { parseSerializedBlocks }