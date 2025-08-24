import type { Notebook } from "../../types/notebooks/notebookStore.types";

interface Note {
    name: string;
    description: string;
    notebook: Notebook
}

interface NotesStore {
    notes: Note[],
    updateNotes: (newNotes: Note[]) => void

    getNotes: () => void

    handleNoteCreate: (createdNote: Note) => void,
    handleNoteEdit: (noteId: number, newNoteData: Note) => void,
    handleNoteDelete: (noteId: number) => void,
}
