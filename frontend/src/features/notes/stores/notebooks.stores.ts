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
    handleNotebookDelete: (notebookId: number) => void,
}