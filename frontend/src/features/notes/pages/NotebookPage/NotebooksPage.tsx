import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useNotebooksStore } from "../../stores/notebooks.stores";
import type { Notebooks } from "../../types/notebooks/notebookStore.types";
import { Dialog } from "@/components/ui/dialog";
import { useCreateNotebookFormStore } from "../../stores/createNotebookForm.stores";
import NotebookDialog from "../../components/NotebookDialog";
import NotebookCard from "./components/NotebookCard";
import CreateNotebookButton from "./components/CreateNotebookButton";

function NotebooksPage() {
	const { notebooks, getNotebooks } = useNotebooksStore();
	const { isFormVisible, updateFormVisibility } =
		useCreateNotebookFormStore();

	const { isLoading, error } = useQuery<Notebooks, Error>({
		queryKey: ["notebooks"],
		queryFn: () => getNotebooks(),
		staleTime: 1000 * 60 * 5,

		refetchOnMount: false,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});

	if (isLoading) {
		return <div>Fetching notebooks ...</div>;
	}

	if (error) {
		return <div>An error occurred while fetching notebooks</div>;
	}

	return (
		<div className="flex flex-row gap-4">
			<Navbar />
			<div className="flex flex-col">
				<div className="flex flex-row mt-3 gap-4">
					<h1 className="font-bold text-3xl">Notebooks</h1>

					<Dialog
						open={isFormVisible}
						onOpenChange={updateFormVisibility}
					>
						<CreateNotebookButton />
						<NotebookDialog mode="create" />
					</Dialog>
				</div>

				<div className="grid grid-cols-4 gap-4 mt-2 pr-8">
					{notebooks.map(({ name, id, notebookColor }) => (
						<NotebookCard
							notebookName={name}
							notebookColor={notebookColor}
							notebookId={id}
							key={id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default NotebooksPage;
