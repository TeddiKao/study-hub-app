import { useQueryClient } from "@tanstack/react-query";
import { useNotesStore } from "../stores/notesStore.stores";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { createNote, deleteNote, editNote } from "../utils/notes.services";
import type { RawNoteData } from "../../types/notes/notesApi.types";
import type { Notes } from "../../types/notes/notesStore.types";

function useNoteMutations() {
    const queryClient = useQueryClient();
    const { currentNotebookId } = useNotesStore();

    async function handleNoteCreate(createdNote: RawNoteData) {
        if (isNullOrUndefined(currentNotebookId)) return;

        const noteCreateResponse = await createNote(
            createdNote,
            currentNotebookId!
        );
        if (!noteCreateResponse.success) {
            throw new Error(noteCreateResponse.error);
        }

        queryClient.setQueryData(
            ["notes", currentNotebookId],
            (oldNotes: Notes) =>
                oldNotes
                    ? [...oldNotes, noteCreateResponse.createdNote]
                    : [noteCreateResponse.createdNote]
        );

        queryClient.invalidateQueries({
            queryKey: ["notebooks"],
        });
    }

    async function handleNoteEdit(noteId: number, newNoteData: RawNoteData) {
        if (isNullOrUndefined(currentNotebookId)) return;

        const noteEditResponse = await editNote(noteId, {
            name: newNoteData.name,
            description: newNoteData.description,
            notebookId: currentNotebookId!,
        });

        if (!noteEditResponse.success) {
            throw new Error(noteEditResponse.error);
        }

        queryClient.setQueryData(
            ["notes", currentNotebookId],
            (oldNotes: Notes) =>
                oldNotes
                    ? oldNotes.map((note) =>
                          note.id === noteId
                              ? noteEditResponse.editedNote
                              : note
                      )
                    : oldNotes
        );

        queryClient.invalidateQueries({
            queryKey: ["notebooks"],
        });
    }

    async function handleNoteDelete(noteId: number) {
        if (isNullOrUndefined(currentNotebookId)) return;

        const noteDeleteResponse = await deleteNote(noteId);
        if (!noteDeleteResponse.success) {
            throw new Error(noteDeleteResponse.error);
        }

        queryClient.setQueryData(
            ["notes", currentNotebookId],
            (oldNotes: Notes) =>
                oldNotes
                    ? oldNotes.filter((note) => note.id !== noteId)
                    : oldNotes
        );

        queryClient.invalidateQueries({
            queryKey: ["notebooks"],
        });
    }

    return {
        handleNoteCreate,
        handleNoteEdit,
        handleNoteDelete,
    };
}

export default useNoteMutations;
