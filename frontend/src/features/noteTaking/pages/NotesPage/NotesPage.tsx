import { Button } from "@/components/ui/button";
import AddIcon from "@/shared/components/icons/AddIcon";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import { NotepadText } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNotesStore } from "../../stores/notes/notesStore.stores";
import useNotesQuery from "../../hooks/query/useNotesQuery.hooks";
import NoteDialog from "../../components/NoteDialog";
import { useCreateNoteDialogStore } from "../../stores/notes/noteDialog.stores";
import { useDeleteNoteAlertStore } from "../../stores/notes/noteAlerts.stores";
import DeleteItemDialog from "@/shared/components/dialog/DeleteItemDialog";
import NoteMenu from "./components/NoteMenu";
import useNotebookIdEffect from "../../hooks/useNotebookIdEffect.hooks";

interface NoteCardProps {
    noteName: string;
    noteId: number;
}

interface NoteTitleProps {
    noteName: string;
}

function NoteTitle({ noteName }: NoteTitleProps) {
    return (
        <div className="flex flex-row gap-1">
            <NotepadText className="w-6 h-6" />
            <p>{noteName}</p>
        </div>
    );
}

function NoteCard({ noteName, noteId }: NoteCardProps) {
    return (
        <div className="flex flex-row py-2 pl-2 justify-between items-center bg-white shadow-md rounded-md pr-1">
            <NoteTitle noteName={noteName} />
            <NoteMenu noteId={noteId} />
        </div>
    );
}

function DeleteNoteAlert() {
    const { visible, showAlert, closeAlert } = useDeleteNoteAlertStore();
    const { currentNoteId, handleNoteDelete, clearCurrentNoteId } =
        useNotesStore();

    function onOpenChange(open: boolean) {
        if (open) {
            showAlert();
        } else {
            closeAlert();
            clearCurrentNoteId();
        }
    }

    async function dialogAction() {
        try {
            if (!currentNoteId) return;

            await handleNoteDelete(currentNoteId);

            closeAlert();
            clearCurrentNoteId();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DeleteItemDialog
            isOpen={visible}
            onOpenChange={onOpenChange}
            dialogTitle="Delete note"
            dialogDescription="Are you sure you want to delete this note?"
            dialogAction={dialogAction}
        />
    );
}

function NotesGrid() {
    const { notes } = useNotesStore();

    return (
        <div className="flex flex-col gap-2">
            {notes.map(({ name, id }) => (
                <NoteCard noteId={id} noteName={name} key={id} />
            ))}
        </div>
    );
}

function NotesPage() {
    const { notebookId } = useParams();
    const { updateNotes, clearCurrentNotebookId, updateCurrentNotebookId } =
        useNotesStore();
    const { data: fetchedNotes, isLoading, error } = useNotesQuery();
    const { showDialog: showCreateNoteDialog } = useCreateNoteDialogStore();
    const { currentNoteId } = useNotesStore();

    useNotebookIdEffect({
        notebookId,
        updateCurrentNotebookId,
        clearCurrentNotebookId,
    });

    useEffect(() => {
        if (!fetchedNotes) return;
        updateNotes(fetchedNotes);
    }, [fetchedNotes, updateNotes]);

    if (isLoading) {
        return <div>Fetching notes</div>;
    }

    if (error) {
        return <div>An error occurred while fetching notes</div>;
    }

    return (
        <>
            <DashboardLayout className="gap-4 pr-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between mt-3">
                        <h1 className="text-3xl font-semibold">Notes</h1>
                        <Button
                            onClick={showCreateNoteDialog}
                            type="button"
                            className="hover:cursor-pointer"
                        >
                            <AddIcon />
                            <span className="-ml-0.5">New note</span>
                        </Button>
                    </div>

                    <NotesGrid />
                </div>
            </DashboardLayout>

            <NoteDialog mode="create" />
            <NoteDialog mode="edit" noteId={currentNoteId ?? undefined} />

            <DeleteNoteAlert />
        </>
    );
}

export default NotesPage;
