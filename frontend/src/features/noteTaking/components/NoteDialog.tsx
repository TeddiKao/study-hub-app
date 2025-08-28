import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import NoteForm from "./NoteForm";

interface NoteDialogProps {
    mode: "create" | "edit";
    noteId?: number;
}

function NoteDialogContent({ mode, noteId }: NoteDialogProps) {
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

export default NoteDialogContent;