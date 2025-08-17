import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NotebookForm from "./NotebookForm";

interface NotebookDialogProps {
	notebookId?: number;
	mode: "create" | "edit";
}

function NotebookDialog({ notebookId, mode }: NotebookDialogProps) {
	const dialogTitle = mode === "create" ? "Create notebook" : "Edit notebook";
	const dialogDescription =
		mode === "create"
			? "Create a notebook here"
			: "Make changes to an existing notebook";
    
    return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogDescription>{dialogDescription}</DialogDescription>
			</DialogHeader>

			<NotebookForm mode={mode} notebookId={notebookId} />
		</DialogContent>
	);
}

export default NotebookDialog;
