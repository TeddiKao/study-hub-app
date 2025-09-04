import type { JSONContent } from "@tiptap/react";
import { create } from "zustand";

interface EditorStateStore {
    selectedBlockId: number | null;
    updateSelectedBlockId: (blockId: number) => void;
    clearSelectedBlockId: () => void;

    selectedBlockType: string | null;
    updateSelectedBlockType: (blockType: string) => void;
    clearSelectedBlockType: () => void;

    selectedBlockContent: JSONContent | null;
    updateSelectedBlockContent: (blockContent: JSONContent) => void;
    clearSelectedBlockContent: () => void;
}

const useEditorStateStore = create<EditorStateStore>((set) => ({
    selectedBlockId: null,
    updateSelectedBlockId: (blockId) => {
        if (Number.isNaN(blockId)) return;
        if (!Number.isFinite(blockId)) return;

        set({ selectedBlockId: blockId });
    },
    clearSelectedBlockId: () => set({ selectedBlockId: null }),

    selectedBlockType: null,
    updateSelectedBlockType: (blockType) => {
        set({ selectedBlockType: blockType });
    },
    clearSelectedBlockType: () => set({ selectedBlockType: null }),

    selectedBlockContent: null,
    updateSelectedBlockContent: (blockContent) => {
        set({ selectedBlockContent: blockContent });
    },
    clearSelectedBlockContent: () => set({ selectedBlockContent: null }),
}));

export { useEditorStateStore };
    
