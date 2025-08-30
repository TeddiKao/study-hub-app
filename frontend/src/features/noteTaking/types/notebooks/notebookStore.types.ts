interface Notebook {
	id: number;
	name: string;
	description: string;
	notebookColor: string;
	noteCount: number;
	owner: {
		id: number;
		email: string;
		username: string;
	};
}

type Notebooks = Notebook[]

export type { Notebook, Notebooks }