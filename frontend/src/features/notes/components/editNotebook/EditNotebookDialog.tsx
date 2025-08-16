import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditNotebookForm from "./EditNotebookForm";

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

			<EditNotebookForm notebookId={notebookId} />
		</DialogContent>
	);
}

export default EditNotebookDialog;
