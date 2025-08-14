import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useNotebooksStore } from "../stores/notebooks.stores";

interface NotebookProps {
	notebookName: string,
}

function Notebook({ notebookName }: NotebookProps) {
	<button
		type="button"
		className="flex flex-col pb-2 bg-white rounded-2xl shadow-xl"
	>
		<div className="w-[180px] h-[180px] rounded-t-2xl bg-gray-100 flex flex-row items-center justify-center">
			<NotebookIcon size={120} className="" />
		</div>

		<div className="flex flex-col ml-3">
			<p className="font-semibold mt-2 text-left">{notebookName}</p>
			<p className="text-gray-400 text-left">12 notes</p>
		</div>
	</button>;
}

function NotebooksPage() {
	const { notebooks, getNotebooks } = useNotebooksStore();

	const { isLoading, error } = useQuery<any, Error>({
		queryKey: ["notebooks"],
		queryFn: () => getNotebooks(),
		staleTime: Infinity,

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
				<h1 className="font-bold text-3xl mt-3">Notebooks</h1>

				<div className="grid grid-cols-5 gap-4 mt-2"></div>
			</div>
		</div>
	);
}

export default NotebooksPage;
