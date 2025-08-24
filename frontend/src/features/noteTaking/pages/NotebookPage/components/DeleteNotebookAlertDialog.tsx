import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNotebooksStore } from "@/features/noteTaking/stores/notebooks.stores";

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

export default DeleteNotebookAlertDialog;
