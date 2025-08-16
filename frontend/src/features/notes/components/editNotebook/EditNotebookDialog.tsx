import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditNotebookForm from "./EditNotebookForm";

function EditNotebookDialog() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit notebook</DialogTitle>
				<DialogDescription>Make changes to an existing notebook</DialogDescription>
			</DialogHeader>

			<EditNotebookForm />
		</DialogContent>
	);
}

export default EditNotebookDialog;
