import { create } from "zustand";
import type { Notebook } from "../../types/notebooks/notebookStore.types";
import { createNote, deleteNote, editNote, fetchNotes } from "../../utils/notes.services";

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

	handleNoteCreate: async (createdNote: Note) => {
        if (!get().currentNotebookId) return;

        const noteCreateResponse = await createNote(createdNote, get().currentNotebookId!);
        if (!noteCreateResponse.success) {
            throw new Error(noteCreateResponse.error);
        };
        
        get().getNotes();
    },

	handleNoteEdit: async (noteId: number, newNoteData: Note) => {
        const noteEditResponse = await editNote(noteId, newNoteData);
        if (!noteEditResponse.success) {
            throw new Error(noteEditResponse.error);
        }

        get().getNotes();
    },

	handleNoteDelete: async (noteId: number) => {
        const noteDeleteResponse = await deleteNote(noteId);
        if (!noteDeleteResponse.success) {
            throw new Error(noteDeleteResponse.error);
        }

        get().getNotes()
    },
}));

export { useNotesStore }