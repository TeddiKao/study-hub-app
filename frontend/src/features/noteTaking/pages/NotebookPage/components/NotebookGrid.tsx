import { useNotebooksStore } from "@/features/noteTaking/stores/notebooks.stores";
import NotebookCard from "./NotebookCard";

function NotebookGrid() {
	const { notebooks } = useNotebooksStore();

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2 pr-8">
			{notebooks.map(({ name, id, notebookColor }) => (
				<NotebookCard
					notebookName={name}
					notebookColor={notebookColor}
					notebookId={id}
					key={id}
				/>
			))}
		</div>
	);
}

export default NotebookGrid;
