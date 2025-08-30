import { useQueryClient } from "@tanstack/react-query";
import type {
    CreateNotebookApiPayload,
    EditNotebookApiPayload,
} from "../../types/notebooks/notebookApi.types";
import { createNotebook, editNotebook, deleteNotebook } from "../../utils/notebooks.services";
import type { Notebooks } from "../../types/notebooks/notebookStore.types";

function useNotebookMutations() {
    const queryClient = useQueryClient();

    async function handleNotebookCreate(
        createdNotebook: CreateNotebookApiPayload
    ) {
        const notebookCreateResponse = await createNotebook(createdNotebook);
        if (!notebookCreateResponse.success) {
            throw new Error(notebookCreateResponse.error);
        }

        queryClient.setQueryData(["notebooks"], (oldNotebooks: Notebooks) =>
            oldNotebooks
                ? [...oldNotebooks, notebookCreateResponse.createdNotebook]
                : [notebookCreateResponse.createdNotebook]
        );
    }

    async function handleNotebookEdit(
        notebookId: number,
        notebookData: EditNotebookApiPayload
    ) {
        const notebookEditResponse = await editNotebook(
            notebookId,
            notebookData
        );
        if (!notebookEditResponse.success) {
            throw new Error(notebookEditResponse.error);
        }

        queryClient.setQueryData(["notebooks"], (oldNotebooks: Notebooks) =>
            oldNotebooks
                ? (oldNotebooks ?? []).map((notebook) =>
                      notebook.id === notebookId
                          ? notebookEditResponse.editedNotebook
                          : notebook
                  )
                : oldNotebooks
        );
    }

    async function handleNotebookDelete(notebookId: number) {
        const notebookDeleteResponse = await deleteNotebook(notebookId);
        if (!notebookDeleteResponse.success) {
            throw new Error(notebookDeleteResponse.error);
        }

        queryClient.setQueryData(["notebooks"], (oldNotebooks: Notebooks) =>
            oldNotebooks
                ? (oldNotebooks ?? []).filter((notebook) => notebook.id !== notebookId)
                : oldNotebooks
        );
    }

    return {
        handleNotebookCreate,
        handleNotebookEdit,
        handleNotebookDelete,
    };
}

export default useNotebookMutations;
