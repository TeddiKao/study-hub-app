import { create } from "zustand";

interface BlocksStore {
    currentNoteId: number | null;
    updateCurrentNoteId: (newNoteId: number) => void;
    clearCurrentNoteId: () => void;   
}

const useBlocksStore = create<BlocksStore>((set) => ({
    currentNoteId: null,
    updateCurrentNoteId: (newNoteId: number) => {
        if (Number.isNaN(newNoteId) || !Number.isFinite(newNoteId)) {
            return;
        }

        set({ currentNoteId: newNoteId });
    },
    clearCurrentNoteId: () => set({ currentNoteId: null }),
}));

export { useBlocksStore };
