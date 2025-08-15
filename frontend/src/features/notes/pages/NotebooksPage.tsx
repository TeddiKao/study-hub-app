import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useNotebooksStore } from "../stores/notebooks.stores";
import type { Notebooks } from "../types/notebooks/notebookStore.types";
import AddIcon from "@/shared/components/icons/AddIcon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateNotebookDialog from "../components/CreateNotebookDialog";

interface NotebookProps {
	notebookName: string;
}

function Notebook({ notebookName }: NotebookProps) {
	return (
		<button
			type="button"
			className="flex flex-col pb-2 bg-white rounded-2xl shadow-xl"
		>
			<div className="w-[180px] h-[180px] rounded-t-2xl bg-gray-100 flex flex-row items-center justify-center">
				<NotebookIcon size={120} className="" />
			</div>

			<div className="flex flex-col ml-3">
				<p className="font-semibold mt-2 text-left">{notebookName}</p>
				<p className="text-gray-400 text-left">0 notes</p>
			</div>
		</button>
	);
}

function CreateNotebookButton() {
	return (
		<DialogTrigger asChild>
			<button className="flex flex-row gap-1 items-center pl-2.5 pr-3 py-2 bg-sky-500 rounded-md shadow-xl text-white font-semibold hover:cursor-pointer">
				<AddIcon />
				<p className="text-white font-semibold">Create</p>
			</button>
		</DialogTrigger>
	);
}

function NotebooksPage() {
	const { notebooks, getNotebooks } = useNotebooksStore();

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
		return <div>An error occured while fetching notebooks</div>;
	}

	return (
		<div className="flex flex-row gap-4">
			<Navbar />
			<div className="flex flex-col">
				<div className="flex flex-row mt-3 gap-4">
					<h1 className="font-bold text-3xl">Notebooks</h1>

					<Dialog>
						<CreateNotebookButton />
						<CreateNotebookDialog />
					</Dialog>
				</div>

				<div className="grid grid-cols-5 gap-4 mt-2">
					{notebooks.map(({ name }) => (
						<Notebook notebookName={name} key={name} />
					))}
				</div>
			</div>
		</div>
	);
}

export default NotebooksPage;
