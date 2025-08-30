import useNotebooksQuery from "@/features/noteTaking/hooks/query/useNotebooksQuery.hooks";
import NotebookCard from "./NotebookCard";

function NotebookGrid() {
	const { data: notebooks } = useNotebooksQuery();

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2 pr-8">
			{notebooks?.map(({ name, id, notebookColor, noteCount }) => (
				<NotebookCard
					notebookName={name}
					notebookColor={notebookColor}
					notebookId={id}
					noteCount={noteCount}
					key={id}
				/>
			))}
		</div>
	);
}

export default NotebookGrid;
