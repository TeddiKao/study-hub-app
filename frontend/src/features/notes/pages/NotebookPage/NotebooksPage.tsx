import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useNotebooksStore } from "../../stores/notebooks.stores";
import type { Notebooks } from "../../types/notebooks/notebookStore.types";
import { Dialog } from "@/components/ui/dialog";
import { useCreateNotebookFormStore } from "../../stores/createNotebookForm.stores";
import NotebookDialog from "../../components/NotebookDialog";
import CreateNotebookButton from "./components/CreateNotebookButton";
import NotebookGrid from "./components/NotebookGrid";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";

function NotebooksPage() {
	const { getNotebooks } = useNotebooksStore();
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
		<DashboardLayout className="gap-4">
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

				<NotebookGrid />
			</div>
		</DashboardLayout>
	);
}

export default NotebooksPage;
