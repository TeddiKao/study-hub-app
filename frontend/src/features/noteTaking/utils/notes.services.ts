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

async function fetchNotes(notebookId: number): Promise<FetchNotesSuccess | ApiErrorResponse> {
    try {
        const response = await api.get(`${NOTES_BASE}/`, {
            params: {
                notebookId: notebookId
            }
        })

        return {
            success: true,
            message: "Successfully fetched notebooks",
            notes: response.data
        }
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to fetch notebooks"
            }
        }

        return {
            success: false,
            error: error.response?.data.error ?? "Failed to fetch notebooks"
        }
    }
}

export { fetchNotes }