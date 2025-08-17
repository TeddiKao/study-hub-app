import { create } from "zustand";
import {
	createNotebook,
	deleteNotebook,
	editNotebook,
	fetchNotebooks,
} from "../utils/notebooks.services";
import type { CreateNotebookApiPayload, EditNotebookApiPayload } from "../types/notebooks/notebookApi.types";
import type { Notebooks } from "../types/notebooks/notebookStore.types";

interface NotebookStore {
	notebooks: Notebooks;

	getNotebooks: () => Promise<Notebooks>;
	handleNotebookCreate: (notebookData: CreateNotebookApiPayload) => Promise<void>;

	handleNotebookEdit: (
		notebookId: number,
		notebookData: EditNotebookApiPayload
	) => Promise<void>;
	handleNotebookDelete: (notebookId: number) => Promise<void>;
}

const useNotebooksStore = create<NotebookStore>((set, get) => ({
	notebooks: [],

	getNotebooks: async () => {
		const notebookFetchResponse = await fetchNotebooks();
		if (!notebookFetchResponse.success) {
			throw new Error(notebookFetchResponse.error);
		}

		set({ notebooks: notebookFetchResponse.notebooks });

		return notebookFetchResponse.notebooks
	},

	handleNotebookCreate: async (notebookData: CreateNotebookApiPayload) => {
		const notebookCreateResponse = await createNotebook(notebookData);
		if (!notebookCreateResponse.success) {
			throw new Error(notebookCreateResponse.error);
		}

		await get().getNotebooks();
	},

	handleNotebookEdit: async (
		notebookId: number,
		notebookData: EditNotebookApiPayload
	) => {
		const notebookEditResponse = await editNotebook(
			notebookId,
			notebookData
		);
		if (!notebookEditResponse.success) {
			throw new Error(notebookEditResponse.error);
		}

		await get().getNotebooks();
	},

	handleNotebookDelete: async (notebookId: number) => {
		const notebookDeleteResponse = await deleteNotebook(notebookId);
		if (!notebookDeleteResponse.success) {
			throw new Error(notebookDeleteResponse.error);
		}

		await get().getNotebooks();
	},
}));

export { useNotebooksStore };
