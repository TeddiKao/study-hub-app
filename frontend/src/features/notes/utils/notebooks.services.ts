import api from "@/app/api"
import type { ApiErrorResponse } from "@/shared/types/api.types"

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

async function createNotebook() {

}

async function editNotebook() {

}

async function deleteNotebook() {

}

export { fetchNotebooks, createNotebook, editNotebook, deleteNotebook }