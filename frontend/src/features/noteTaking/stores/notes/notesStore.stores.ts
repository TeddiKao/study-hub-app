import { create } from "zustand";

interface NotesStore {
	currentNotebookId: number | null;
    currentNoteId: number | null,

	updateCurrentNotebookId: (newNotebookId: number) => void;
    clearCurrentNotebookId: () => void,

    updateCurrentNoteId: (newNoteId: number) => void,
    clearCurrentNoteId: () => void,
}

const useNotesStore = create<NotesStore>((set) => ({
	currentNotebookId: null,
    currentNoteId: null,

	updateCurrentNotebookId: (newNotebookId: number) =>
		set({ currentNotebookId: newNotebookId }),
    clearCurrentNotebookId: () => set({ currentNotebookId: null }),

    updateCurrentNoteId: (newNoteId: number) =>
        set({ currentNoteId: newNoteId }),
    clearCurrentNoteId: () => set({ currentNoteId: null }),
}));

export { useNotesStore }