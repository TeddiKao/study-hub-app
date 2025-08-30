import type {
    Notebook,
    Notebooks,
} from "@/features/noteTaking/notebooks/types/notebookStore.types";

interface NotebookApiSuccess {
    success: true;
    message: string;
}

interface NotebookFetchSuccess extends NotebookApiSuccess {
    notebooks: Notebooks;
}

interface NotebookCreateSuccess extends NotebookApiSuccess {
    createdNotebook: Notebook;
}

interface NotebookEditSuccess extends NotebookApiSuccess {
    editedNotebook: Notebook;
}

interface NotebookRetrieveSuccess extends NotebookApiSuccess {
    retrievedNotebook: Notebook;
}

interface GetNoteCountSuccess extends NotebookApiSuccess {
    noteCount: number;
}

interface CreateNotebookApiPayload {
    name: string;
    description: string;
    notebookColor: string;
}

interface EditNotebookApiPayload extends CreateNotebookApiPayload {}

export type {
    NotebookFetchSuccess,
    NotebookCreateSuccess,
    NotebookApiSuccess,
    NotebookEditSuccess,
    NotebookRetrieveSuccess,
    GetNoteCountSuccess,
    CreateNotebookApiPayload,
    EditNotebookApiPayload,
};
