import api from "@/app/api"
import type { ApiErrorResponse } from "@/shared/types/api.types"

interface CreateNotebooApiPayload {
    name: string,
    description: string,
    notebookColor: string,
}

interface EditNotebookApiPayload {
    name?: string,
    description?: string,
    notebookColor?: string,
}

interface Notebook {
    id: number,
    name: string,
    description: string,
    notebookColor: string,
    owner: {
        id: number,
        email: string,
        username: string
    }
}

interface NotebookApiSuccess {
    success: true,
    message: string,
}

interface NotebookCreateSuccess extends NotebookApiSuccess {
    createdNotebook: Notebook
}

type Notebooks = Notebook[]

async function fetchNotebooks(): Promise<Notebooks | ApiErrorResponse> {
    try {
        const response = await api.get("notes/notebooks/")

        return response.data
    } catch (error) {
        return {
            success: false,
            error: "Failed to fetch notebooks",
        }
    }
}

async function createNotebook(notebookData: CreateNotebooApiPayload): Promise<NotebookCreateSuccess | ApiErrorResponse> {
    try {
        const response = await api.post("notes/notebooks/create/", notebookData)

        return {
            success: true,
            createdNotebook: response.data,
            message: "Notebook created successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Failed to create notebook"
        }
    }
}

async function editNotebook() {

}

async function deleteNotebook(notebookId: number): Promise<NotebookApiSuccess | ApiErrorResponse> {
    try {
        await api.delete(`notes/notebook/${notebookId}/delete/`)

        return {
            success: true,
            message: "Notebook deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Failed to delete notebook"
        }
    }
}

export { fetchNotebooks, createNotebook, editNotebook, deleteNotebook }