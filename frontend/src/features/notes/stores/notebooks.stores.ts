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
			return;
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
			return;
		}

		await get().getNotebooks();
	},

	handleNotebookDelete: async (notebookId) => {
		const notebookDeleteResponse = await deleteNotebook(notebookId);
		if (!notebookDeleteResponse.success) {
			return;
		}

		await get().getNotebooks();
	},
}));

export { useNotebooksStore };
