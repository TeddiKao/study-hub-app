import api from "@/app/api"
import { NOTES_BASE } from "@/app/api.constants"
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/types/api.types"
import type { Notebook } from "../types/notebooks/notebookStore.types";
import { isAxiosError } from "axios";

interface Note {
    name: string;
    description: string;
    notebook: Notebook
}

interface FetchNotesSuccess extends ApiSuccessResponse {
    notes: Note[]
}

interface CreateNoteSuccess extends ApiSuccessResponse {
    createdNote: Note
}

async function fetchNotes(notebookId: number): Promise<FetchNotesSuccess | ApiErrorResponse> {
    try {
        const response = await api.get(`${NOTES_BASE}/`, {
            params: {
                notebookId: notebookId
            }
        })

        return {
            success: true,
            message: "Successfully fetched notes",
            notes: response.data
        }
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to fetch notes"
            }
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to fetch notes"
        }
    }
}

async function createNote(noteData: Note): Promise<CreateNoteSuccess | ApiErrorResponse> {
    try {
        const response = await api.post(`${NOTES_BASE}/note/create/`, noteData)

        return {
            success: true,
            message: "Successfully created note",
            createdNote: response.data
        }
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to create note"
            }
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to create note"
        }
    }
}

async function deleteNote(noteId: number): Promise<ApiSuccessResponse | ApiErrorResponse> {
    try {
        await api.delete(`${NOTES_BASE}/note/${noteId}/delete/`)

        return {
            success: true,
            message: "Note deleted successfully"
        }
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to delete note"
            }
        }

        return {
            success: false,
            error: error?.response?.data?.error ?? "Failed to delete note"
        }
    }
}

export { fetchNotes, createNote, deleteNote }