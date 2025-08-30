import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import NoteForm from "../../components/NoteForm";
import {
    useEditNoteDialogStore,
    useCreateNoteDialogStore,
} from "../../stores/notes/noteDialog.stores";
import { useNotesStore } from "../../stores/notes/notesStore.stores";

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

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>

            <NoteForm mode={mode} noteId={noteId} />
        </DialogContent>
    );
}

function NoteDialog({ mode, noteId }: NoteDialogProps) {
    const editNotebookDialogStore = useEditNoteDialogStore();
    const createNoteDialogStore = useCreateNoteDialogStore();

    const { clearCurrentNoteId } = useNotesStore();

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

    const isOpen =
        mode === "create" ? visible : visible && !isNullOrUndefined(noteId);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open: boolean) => {
                if (open) {
                    showDialog();
                } else {
                    closeDialog();

                    if (mode === "edit") {
                        clearCurrentNoteId();
                    }
                }
            }}
        >
            <NoteDialogContent mode={mode} noteId={noteId} />
        </Dialog>
    );
}

export default NoteDialog;
