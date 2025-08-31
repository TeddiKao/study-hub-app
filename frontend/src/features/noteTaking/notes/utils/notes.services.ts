import api from "@/app/api/api";
import { NOTES_BASE } from "@/app/api/api.constants";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
} from "@/shared/types/api.types";
import { isAxiosError, type AxiosResponse } from "axios";
import type {
    CreateNoteSuccess,
    EditNoteSuccess,
    FetchNotesSuccess,
    NotePayload,
    NoteResponse,
    RawNoteData,
    RetrieveNoteSuccess,
} from "../types/notesApi.types";

async function fetchNotes(
    notebookId: number
): Promise<FetchNotesSuccess | ApiErrorResponse> {
    try {
        const response = await api.get(`${NOTES_BASE}/`, {
            params: {
                notebookId: notebookId,
            },
        });

        return {
            success: true,
            message: "Successfully fetched notes",
            notes: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to fetch notes",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to fetch notes",
        };
    }
}

async function createNote(
    noteData: RawNoteData,
    notebookId: number
): Promise<CreateNoteSuccess | ApiErrorResponse> {
    try {
        const response = await api.post<
            NoteResponse,
            AxiosResponse<NoteResponse>,
            NotePayload
        >(`${NOTES_BASE}/note/create/`, {
            name: noteData.name,
            description: noteData.description,
            notebookId: notebookId,
        });

        return {
            success: true,
            message: "Successfully created note",
            createdNote: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to create note",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to create note",
        };
    }
}

async function retrieveNote(
    noteId: number
): Promise<RetrieveNoteSuccess | ApiErrorResponse> {
    try {
        const response = await api.get<NoteResponse>(
            `${NOTES_BASE}/note/${noteId}/`
        );

        return {
            success: true,
            message: "Successfully retrieved note",
            retrievedNote: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to retrieve note",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to retrieve note",
        };
    }
}

async function editNote(
    noteId: number,
    newNoteData: NotePayload
): Promise<EditNoteSuccess | ApiErrorResponse> {
    try {
        const response = await api.put(
            `${NOTES_BASE}/note/${noteId}/edit/`,
            newNoteData
        );

        return {
            success: true,
            message: "Note edited successfully",
            editedNote: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to edit note",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to edit note",
        };
    }
}

async function deleteNote(
    noteId: number
): Promise<ApiSuccessResponse | ApiErrorResponse> {
    try {
        await api.delete(`${NOTES_BASE}/note/${noteId}/delete/`);

        return {
            success: true,
            message: "Note deleted successfully",
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to delete note",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to delete note",
        };
    }
}

export { fetchNotes, createNote, deleteNote, editNote, retrieveNote };
