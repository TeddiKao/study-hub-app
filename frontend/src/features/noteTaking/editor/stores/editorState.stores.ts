import { create } from "zustand";

interface EditorStateStore {
    selectedBlockId: number | null;
    updateSelectedBlockId: (blockId: number) => void;
    clearSelectedBlockId: () => void;

    selectedBlockType: string | null;
    updateSelectedBlockType: (blockType: string) => void;
    clearSelectedBlockType: () => void;
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
}));

export { useEditorStateStore };
    
