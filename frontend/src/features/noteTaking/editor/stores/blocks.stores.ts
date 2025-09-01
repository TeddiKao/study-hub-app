import { create } from "zustand";

interface BlocksStore {
    currentNoteId: number | null;
    updateCurrentNoteId: (newNoteId: number) => void;
    clearCurrentNoteId: () => void;   
}

const useBlocksStore = create<BlocksStore>((set) => ({
    currentNoteId: null,
    updateCurrentNoteId: (newNoteId: number) => set({ currentNoteId: newNoteId }),
    clearCurrentNoteId: () => set({ currentNoteId: null }),
}));

export { useBlocksStore };
