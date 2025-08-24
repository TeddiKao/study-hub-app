import api from "@/app/api"
import { NOTES_BASE } from "@/app/api.constants"
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/types/api.types"
import type { Notebook } from "../types/notebooks/notebookStore.types";

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


    }
}

export { fetchNotes }