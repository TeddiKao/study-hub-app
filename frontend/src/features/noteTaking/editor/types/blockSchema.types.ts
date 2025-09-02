import type { Note } from "../../notes/types/notesStore.types";

interface Block {
    id: number;
    blockType: string;
    blockContent: string;
    note: Note;
    blockOrder: number;
}

type Blocks = Block[];

export type { Block, Blocks };
