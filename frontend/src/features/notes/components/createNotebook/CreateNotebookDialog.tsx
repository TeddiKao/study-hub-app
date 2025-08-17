import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import NotebookForm from "../NotebookForm";

function CreateNotebookDialog() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create notebook</DialogTitle>
				<DialogDescription>Create a notebook here</DialogDescription>
			</DialogHeader>

			<NotebookForm mode="create" />
		</DialogContent>
	);
}

export default CreateNotebookDialog;
