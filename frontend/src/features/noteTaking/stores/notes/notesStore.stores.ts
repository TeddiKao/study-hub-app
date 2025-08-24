import { create } from "zustand";
import type { Notebook } from "../../types/notebooks/notebookStore.types";
import { fetchNotes } from "../../utils/notes.services";

interface Note {
	name: string;
	description: string;
	notebook: Notebook;
}

interface NotesStore {
	notes: Note[];
	currentNotebookId: number | null;

	updateNotes: (newNotes: Note[]) => void;
	updateCurrentNotebookId: (newNotebookId: number) => void;

	getNotes: () => void;

	handleNoteCreate: (createdNote: Note) => void;
	handleNoteEdit: (noteId: number, newNoteData: Note) => void;
	handleNoteDelete: (noteId: number) => void;
}

const useNotesStore = create<NotesStore>((set, get) => ({
	notes: [],
	currentNotebookId: null,
	updateNotes: (newNotes: Note[]) => set({ notes: newNotes }),
	updateCurrentNotebookId: (newNotebookId: number) =>
		set({ currentNotebookId: newNotebookId }),

	getNotes: async () => {
        if (!get().currentNotebookId) return;

        const notebookFetchResponse = await fetchNotes(get().currentNotebookId!)
        if (!notebookFetchResponse.success) {
            throw new Error(notebookFetchResponse.error)
        }

        get().updateNotes(notebookFetchResponse.notes);
    },

	handleNoteCreate: () => {},

	handleNoteEdit: () => {},

	handleNoteDelete: () => {},
}));
