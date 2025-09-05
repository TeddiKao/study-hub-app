import type { JSONContent } from "@tiptap/react";
import type { Note } from "../../notes/types/notesStore.types";

interface Block {
    id: number;
    blockType: string;
    blockContent: JSONContent[];
    note: Note;
    blockOrder: number;
}

interface TiptapSerializedBlock {
    type: string;
    content: JSONContent[];
    attrs: {
        id: number;
        position: number;
        note: Note;
    };
}

type Blocks = Block[];
type TiptapSerializedBlocks = TiptapSerializedBlock[];

export type { Block, Blocks, TiptapSerializedBlock, TiptapSerializedBlocks };
