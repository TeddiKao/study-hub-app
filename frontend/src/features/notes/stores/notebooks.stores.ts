import { create } from "zustand";
import { createNotebook, deleteNotebook, editNotebook, fetchNotebooks } from "../utils/notebooks.services";

interface Notebook {
	id: number;
	name: string;
	description: string;
	notebookColor: string;
	owner: {
		id: number;
		email: string;
		username: string;
	};
}

type Notebooks = Notebook[]

interface NotebookStore {
    notebooks: Notebooks,

    getNotebooks: () => void
    handleNotebookCreate: (notebookData: Notebook) => void
    handleNotebookEdit: (notebookId: number, notebookData: Notebook) => void
    handleNotebookDelete: (notebookId: number) => Promise<void>,
}

const useNotebookStore = create<NotebookStore>((set, get) => ({
    notebooks: [],

    getNotebooks: async () => {
        const notebookFetchResponse = await fetchNotebooks();
        if (!notebookFetchResponse.success) {
            return;
        }

        set({ notebooks: notebookFetchResponse.notebooks })
    },

    handleNotebookCreate: async (notebookData: Notebook) => {
        const notebookCreateResponse = await createNotebook(notebookData);
        if (!notebookCreateResponse.success) {
            return;
        }

        await get().getNotebooks()
    },

    handleNotebookEdit: async (notebookId: number, notebookData: Notebook) => {
        const notebookEditResponse = await editNotebook(notebookId, notebookData)
        if (!notebookEditResponse.success) {
            return;
        }

        await get().getNotebooks()
    },

    handleNotebookDelete: async (notebookId) => {
        const notebookDeleteResponse = await deleteNotebook(notebookId);
        if (!notebookDeleteResponse.success) {
            return;
        }

        await get().getNotebooks()
    }
}))

export { useNotebookStore }