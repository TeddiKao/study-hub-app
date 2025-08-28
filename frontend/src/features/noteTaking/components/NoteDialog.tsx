import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import NoteForm from "./NoteForm";
import { useEditNoteDialogStore, useCreateNoteDialogStore } from "../stores/notes/noteDialog.stores";

interface NoteDialogProps {
	mode: "create" | "edit";
	noteId?: number;
}

type NoteDialogContentProps = NoteDialogProps;

function NoteDialogContent({ mode, noteId }: NoteDialogContentProps) {
	const dialogTitle = mode === "create" ? "Create note" : "Edit note";
	const dialogDescription =
		mode === "create"
			? "Create a note here"
			: "Make changes to an existing note";

	if (mode === "edit" && isNullOrUndefined(noteId)) {
		throw new Error("NoteDialog: noteId is required in edit mode");
	}

	return (
		<DialogContent>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogDescription>{dialogDescription}</DialogDescription>

			<NoteForm mode={mode} noteId={noteId} />
		</DialogContent>
	);
}

function NoteDialog({ mode, noteId }: NoteDialogProps) {
	const editNotebookDialogStore = useEditNoteDialogStore();
	const createNoteDialogStore = useCreateNoteDialogStore();

	const visible =
		mode === "create"
			? createNoteDialogStore.visible
			: editNotebookDialogStore.visible;
	const closeDialog =
		mode === "create"
			? createNoteDialogStore.closeDialog
			: editNotebookDialogStore.closeDialog;
	const showDialog =
		mode === "create"
			? createNoteDialogStore.showDialog
			: editNotebookDialogStore.showDialog;

	return (
		<Dialog
			open={visible}
			onOpenChange={(open: boolean) => {
				if (open) {
					showDialog();
				} else {
					closeDialog();
				}
			}}
		>
			<NoteDialogContent mode={mode} noteId={noteId} />
		</Dialog>
	);
}

export default NoteDialog;
