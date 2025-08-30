import { useQueryClient } from "@tanstack/react-query";
import KebabMenuIcon from "@/shared/components/icons/KebabMenuIcon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteNoteAlertStore } from "@/features/noteTaking/notes/stores/noteAlerts.stores";
import { useEditNoteDialogStore } from "@/features/noteTaking/notes/stores/noteDialog.stores";
import { useNotesStore } from "@/features/noteTaking/notes/stores/notesStore.stores";

interface NoteMenuProps {
    noteId: number;
}

interface NoteMenuContentProps {
    noteId: number;
}

function NoteMenuButton() {
    return (
        <DropdownMenuTrigger asChild>
            <button type="button" className="w-6 h-6">
                <KebabMenuIcon className="w-6 h-6" />
            </button>
        </DropdownMenuTrigger>
    );
}

function NoteMenuContent({ noteId }: NoteMenuContentProps) {
    const queryClient = useQueryClient();
    const { showDialog: showEditNoteDialog } = useEditNoteDialogStore();
    const { updateCurrentNoteId } = useNotesStore();
    const { showAlert: showDeleteNoteAlert } = useDeleteNoteAlertStore();

    function handleEdit() {
        setTimeout(() => {
            queryClient.invalidateQueries({
                queryKey: ["note", noteId],
            });
            updateCurrentNoteId(noteId);
            showEditNoteDialog();
        }, 0);
    }

    function handleDelete() {
        setTimeout(() => {
            updateCurrentNoteId(noteId);
            showDeleteNoteAlert();
        }, 0);
    }

    return (
        <DropdownMenuContent side="left" align="start" alignOffset={-2}>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

function NoteMenu({ noteId }: NoteMenuProps) {
    return (
        <div className="hover:cursor-pointer hover:bg-gray-300 rounded-md w-6 h-6">
            <DropdownMenu>
                <NoteMenuButton />
                <NoteMenuContent noteId={noteId} />
            </DropdownMenu>
        </div>
    );
}

export default NoteMenu;
