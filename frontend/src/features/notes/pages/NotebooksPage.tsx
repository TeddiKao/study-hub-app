import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotebooksStore } from "../stores/notebooks.stores";
import type { Notebooks } from "../types/notebooks/notebookStore.types";
import AddIcon from "@/shared/components/icons/AddIcon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm.stores";
import KebabMenuIcon from "@/shared/components/icons/KebabMenuIcon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useEditNotebookFormStore } from "../stores/editNotebookForm.stores";
import NotebookDialog from "../components/NotebookDialog";

interface NotebookProps {
	notebookName: string;
	notebookId: number;
}

interface NotebookDropdownMenuProps {
	notebookId: number;
}

interface DeleteNotebookAlertDialog {
	notebookId: number;
}

function DeleteNotebookAlertDialog({ notebookId }: DeleteNotebookAlertDialog) {
	const { handleNotebookDelete } = useNotebooksStore();

	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete notebook?</AlertDialogTitle>
				<AlertDialogDescription>
					This will permanently delete your notebook. This cannot be
					undone
				</AlertDialogDescription>
			</AlertDialogHeader>

			<AlertDialogFooter>
				<AlertDialogCancel className="hover:cursor-pointer">
					Cancel
				</AlertDialogCancel>
				<AlertDialogAction
					onClick={async () => {
						try {
							await handleNotebookDelete(notebookId);
						} catch (error) {
							console.error(error);
						}
					}}
					className="bg-red-500 hover:bg-red-900 hover:cursor-pointer"
				>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}

function NotebookDropdownMenu({ notebookId }: NotebookDropdownMenuProps) {
	const {
		isFormVisible,
		updateFormVisibility,
		activeNotebookId,
		updateActiveNotebookId,
	} = useEditNotebookFormStore();

	const queryClient = useQueryClient();

	const isNotebookActive = notebookId === activeNotebookId;

	return (
		<Dialog
			open={isFormVisible && isNotebookActive}
			onOpenChange={updateFormVisibility}
		>
			<AlertDialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							aria-label="Notebook actions"
							className="py-0.5 rounded-sm hover:cursor-pointer hover:bg-gray-300"
						>
							<KebabMenuIcon size={20} />
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent side="right">
						<DropdownMenuItem asChild>
							<DialogTrigger
								onClick={() => {
									updateActiveNotebookId(notebookId);
									queryClient.invalidateQueries({
										queryKey: ["notebookInfo", notebookId]
									})
								}}
								className="w-full"
							>
								Edit
							</DialogTrigger>
						</DropdownMenuItem>
						<DropdownMenuItem asChild variant="destructive">
							<AlertDialogTrigger className="w-full">
								Delete
							</AlertDialogTrigger>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DeleteNotebookAlertDialog notebookId={notebookId} />
			</AlertDialog>

			<NotebookDialog mode="edit" notebookId={notebookId} />
		</Dialog>
	);
}

function Notebook({ notebookName, notebookId }: NotebookProps) {
	return (
		<div
			aria-label="open-notebook-button"
			role="button"
			className="flex flex-row py-3 pl-3 pr-2 bg-white rounded-2xl shadow-xl items-center"
		>
			<div className="p-1 w-max h-max rounded-md bg-gray-300">
				<NotebookIcon size={20} />
			</div>

			<div className="flex flex-col ml-3 mr-1">
				<p className="font-semibold text-left">{notebookName}</p>

				<div className="flex flex-row justify-between items-center">
					<p className="text-gray-400 text-left">0 notes</p>
				</div>
			</div>

			<NotebookDropdownMenu notebookId={notebookId} />
		</div>
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
	const { isFormVisible, updateFormVisibility } = useCreateNotebookFormStore();

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

				<div className="grid grid-cols-5 gap-4 mt-2">
					{notebooks.map(({ name, id }) => (
						<Notebook
							notebookName={name}
							notebookId={id}
							key={name}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default NotebooksPage;
