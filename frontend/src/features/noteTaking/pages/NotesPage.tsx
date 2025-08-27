import { Button } from "@/components/ui/button";
import AddIcon from "@/shared/components/icons/AddIcon";
import KebabMenuIcon from "@/shared/components/icons/KebabMenuIcon";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import { NotepadText } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNotesStore } from "../stores/notes/notesStore.stores";
import useNotesQuery from "../hooks/query/useNotesQuery.hooks";

interface NoteCardProps {
	noteName: string;
}

function NoteCard({ noteName }: NoteCardProps) {
	return (
		<div className="flex flex-row py-2 pl-2 justify-between items-center bg-white shadow-md rounded-md pr-1">
			<div className="flex flex-row gap-1">
				<NotepadText className="w-6 h-6" />
				<p>{noteName}</p>
			</div>

			<button className="py-1 hover:cursor-pointer hover:bg-gray-300 rounded-md">
				<KebabMenuIcon className="w-6 h-6" />
			</button>
		</div>
	);
}

function NotesPage() {
	const { notebookId } = useParams();
	const {
		notes,
		updateNotes,
		clearCurrentNotebookId,
		updateCurrentNotebookId,
	} = useNotesStore();

	const {
		data: fetchedNotes,
		isLoading,
		error,
	} = useNotesQuery();

	useEffect(() => {
		if (!fetchedNotes) return;

		updateNotes(fetchedNotes);
	}, [fetchedNotes]);

	useEffect(() => {
		updateCurrentNotebookId(Number(notebookId));

		return () => {
			clearCurrentNotebookId();
		};
	}, [notebookId]);

	if (isLoading) {
		return <div>Fetching notes</div>;
	}

	if (error) {
		return <div>An error occured while fetching notes</div>;
	}

	return (
		<DashboardLayout className="gap-4 pr-4">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row items-center justify-between mt-3">
					<h1 className="text-3xl font-semibold">Notes</h1>
					<Button type="button" className="hover:cursor-pointer">
						<AddIcon /> <span className="-ml-0.5">New note</span>
					</Button>
				</div>

				<div className="flex flex-col">
					{notes.map(({ name, id }, _) => (
						<NoteCard noteName={name} key={id} />
					))}
				</div>
			</div>
		</DashboardLayout>
	);
}

export default NotesPage;
