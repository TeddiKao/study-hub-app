import type { Note } from "../../notes/types/notesStore.types";

interface Block {
    id: number;
    blockType: string;
    blockContent: string;
    note: Note;
    blockOrder: number;
}

interface TiptapSerializedBlock {
    type: string;
    content: Record<string, unknown>[];
    attrs: {
        id: number;
        position: number;
        note: Note;
    };
}

type Blocks = Block[];
type TiptapSerializedBlocks = TiptapSerializedBlock[];

export type { Block, Blocks, TiptapSerializedBlock, TiptapSerializedBlocks };
