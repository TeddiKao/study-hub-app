import type { JSONContent } from "@tiptap/react";
import type { Note } from "../../notes/types/notesStore.types";

interface Block {
    id: number;
    type: string;
    content: JSONContent[];
    note: Note;
    position: number;
}

interface TiptapSerializedBlock {
    type: string;
    content: JSONContent[];
    attrs: {
        id: number;
        tempBlockId?: string;
        position: number;
        note: Note;
    };
}

type Blocks = Block[];
type TiptapSerializedBlocks = TiptapSerializedBlock[];

export type { Block, Blocks, TiptapSerializedBlock, TiptapSerializedBlocks };
