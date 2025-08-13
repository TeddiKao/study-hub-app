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