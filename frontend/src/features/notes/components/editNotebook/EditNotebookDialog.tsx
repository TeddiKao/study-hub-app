import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NotebookForm from "../NotebookForm";

interface EditNotebookDialogProps {
    notebookId: number
}

function EditNotebookDialog({ notebookId }: EditNotebookDialogProps) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit notebook</DialogTitle>
				<DialogDescription>Make changes to an existing notebook</DialogDescription>
			</DialogHeader>

			<NotebookForm mode="edit" notebookId={notebookId} />
		</DialogContent>
	);
}

export default EditNotebookDialog;
