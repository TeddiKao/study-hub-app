import api from "@/app/api";
import type { ApiErrorResponse } from "@/shared/types/api.types";
import { isAxiosError } from "axios";

import type {
	NotebookFetchSuccess,
	CreateNotebookApiPayload,
	NotebookCreateSuccess,
	EditNotebookApiPayload,
	NotebookEditSuccess,
	NotebookApiSuccess,
} from "../types/notebooks/notebookApi.types";

async function fetchNotebooks(): Promise<
	NotebookFetchSuccess | ApiErrorResponse
> {
	try {
		const response = await api.get("notes/notebooks/");

		return {
			success: true,
			notebooks: response.data,
			message: "Notebooks fetched successfully",
		};
	} catch (error) {
		if (!isAxiosError(error)) {
			return {
				success: false,
				error: "Failed to fetch notebooks",
			};
		}

		return {
			success: false,
			error: error.response?.data.error ?? "Failed to fetch notebooks",
		};
	}
}

async function createNotebook(
	notebookData: CreateNotebookApiPayload
): Promise<NotebookCreateSuccess | ApiErrorResponse> {
	try {
		const response = await api.post(
			"notes/notebook/create/",
			notebookData
		);

		return {
			success: true,
			createdNotebook: response.data,
			message: "Notebook created successfully",
		};
	} catch (error) {
		if (!isAxiosError(error)) {
			return {
				success: false,
				error: "Failed to create notebook",
			};
		}

		return {
			success: false,
			error: error.response?.data.error ?? "Failed to create notebook",
		};
	}
}

async function editNotebook(
	notebookId: number,
	notebookData: EditNotebookApiPayload
): Promise<NotebookEditSuccess | ApiErrorResponse> {
	try {
		const response = await api.put(
			`notes/notebook/${notebookId}/edit/`,
			notebookData
		);

		return {
			success: true,
			message: "Notebook edited successfully",
			editedNotebook: response.data,
		};
	} catch (error) {
		if (!isAxiosError(error)) {
			return {
				success: false,
				error: "Failed to edit notebook",
			};
		}

		return {
			success: false,
			error: error.response?.data.error ?? "Failed to edit notebook",
		};
	}
}

async function deleteNotebook(
	notebookId: number
): Promise<NotebookApiSuccess | ApiErrorResponse> {
	try {
		await api.delete(`notes/notebook/${notebookId}/delete/`);

		return {
			success: true,
			message: "Notebook deleted successfully",
		};
	} catch (error) {
		if (!isAxiosError(error)) {
			return {
				success: false,
				error: "Failed to delete notebook",
			};
		}

		return {
			success: false,
			error: error.response?.data.error ?? "Failed to delete notebook",
		};
	}
}

export { fetchNotebooks, createNotebook, editNotebook, deleteNotebook };
