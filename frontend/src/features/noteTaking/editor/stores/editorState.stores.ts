import type { JSONContent } from "@tiptap/react";
import { create } from "zustand";

interface EditorStateStore {
    selectedBlockId: number | null;
    updateSelectedBlockId: (id: number) => void;
    clearSelectedBlockId: () => void;

    selectedBlockType: string | null;
    updateSelectedBlockType: (type: string) => void;
    clearSelectedBlockType: () => void;

    selectedBlockContent: JSONContent[] | null;
    updateSelectedBlockContent: (content: JSONContent[]) => void;
    clearSelectedBlockContent: () => void;

    selectedBlockPosition: number | null;
    updateSelectedBlockPosition: (position: number) => void;
    clearSelectedBlockPosition: () => void;
}

const useEditorStateStore = create<EditorStateStore>((set) => ({
    selectedBlockId: null,
    updateSelectedBlockId: (id) => {
        if (Number.isNaN(id)) return;
        if (!Number.isFinite(id)) return;

        set({ selectedBlockId: id });
    },
    clearSelectedBlockId: () => set({ selectedBlockId: null }),

    selectedBlockType: null,
    updateSelectedBlockType: (type) => {
        set({ selectedBlockType: type });
    },
    clearSelectedBlockType: () => set({ selectedBlockType: null }),

    selectedBlockContent: null,
    updateSelectedBlockContent: (content) => {
        set({ selectedBlockContent: content });
    },
    clearSelectedBlockContent: () => set({ selectedBlockContent: null }),

    selectedBlockPosition: null,
    updateSelectedBlockPosition: (position) => {
        if (Number.isNaN(position)) return;
        if (!Number.isFinite(position)) return;

        set({ selectedBlockPosition: position });
    },
    clearSelectedBlockPosition: () => set({ selectedBlockPosition: null }),
}));

export { useEditorStateStore };
    
