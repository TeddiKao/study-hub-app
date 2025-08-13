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

interface CreateNotebookApiPayload {
	name: string;
	description: string;
	notebookColor: string;
}

interface EditNotebookApiPayload extends CreateNotebookApiPayload {}

export type {
	NotebookFetchSuccess,
	NotebookCreateSuccess,
	NotebookEditSuccess,
	CreateNotebookApiPayload,
	EditNotebookApiPayload,
};
