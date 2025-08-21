import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NotebookForm from "./NotebookForm";
import { isNullOrUndefined } from "@/shared/utils/types.utils";

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

	if (mode === "edit" && isNullOrUndefined(notebookId)) {
		throw new Error("NotebookDialog: notebookId is required in edit mode");
	}
    
    return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogDescription>{dialogDescription}</DialogDescription>
			</DialogHeader>

			{mode === "create" ? (
				<NotebookForm mode="create" />
			) : (
				<NotebookForm mode="edit" notebookId={notebookId!} />
			)}
		</DialogContent>
	);
}

export default NotebookDialog;
