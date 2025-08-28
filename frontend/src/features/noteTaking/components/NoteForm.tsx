import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, type FormEvent } from "react";
import { useNotesStore } from "../stores/notes/notesStore.stores";
import { useNoteFormStore } from "../stores/notes/noteForm.stores";
import { useCreateNoteDialogStore, useEditNoteDialogStore } from "../stores/notes/noteDialog.stores";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useQuery } from "@tanstack/react-query";
import { retrieveNote } from "../utils/notes.services";

interface NoteFormProps {
	mode: "create" | "edit";
	noteId?: number;
}

function NoteForm({ mode, noteId }: NoteFormProps) {
	const { handleNoteCreate, handleNoteEdit, currentNotebookId } = useNotesStore();
	const { name, description, updateName, updateDescription, clearDetails } =
		useNoteFormStore();

	const { closeDialog: closeCreateNoteDialog } = useCreateNoteDialogStore();
	const { closeDialog: closeEditNoteDialog } = useEditNoteDialogStore();

	const nameFieldPlaceholder = mode === "create" ? "Note name" : "New name";
	const descriptionFieldPlaceholder =
		mode === "create"
			? "Briefly describe what this note is about"
			: "New description";
	const submitButtonText = mode === "create" ? "Create note" : "Save changes";

	const { data: note, isLoading, error } = useQuery({
		queryKey: ["note", noteId],
		queryFn: async () => {
			const noteRetriveResponse = await retrieveNote(noteId!);

			if (!noteRetriveResponse.success) {
				throw new Error(noteRetriveResponse.error);
			}

			return noteRetriveResponse.retrievedNote;
		},

		enabled: mode === "edit" && !isNullOrUndefined(noteId),
		staleTime: 2 * 1000 * 60,
	})

	useEffect(() => {
		if (note) {
			updateName(note.name);
			updateDescription(note.description);
		}
	}, [note, updateName, updateDescription]);

	async function handleNoteCreation() {
		try {
			await handleNoteCreate({
				name: name,
				description: description,
			});

			clearDetails();

			closeCreateNoteDialog();
		} catch (error) {
			console.error("Error creating note:", error);
			// Optionally, set an error state here to display an error message to the user
		}
	}

	async function handleNoteEditing() {
		try {
			await handleNoteEdit(noteId!, {
				name: name,
				description: description,
				notebookId: currentNotebookId!,
			});

			clearDetails();
			closeEditNoteDialog();
		} catch (error) {
			console.error("Error editing note:", error);
		}
	}

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (mode === "create") {
			await handleNoteCreation();
		} else if (mode === "edit" && noteId) {
			await handleNoteEditing();
		}
	}

	return (
		<form className="flex flex-col p-2 gap-2" onSubmit={handleFormSubmit}>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<Label htmlFor="note-name">Note Name</Label>
					<Input
						placeholder={nameFieldPlaceholder}
						id="note-name"
						type="text"
						value={name}
						onChange={(e) => updateName(e.target.value)}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<Label htmlFor="note-description">Note Description</Label>
					<Textarea
						placeholder={descriptionFieldPlaceholder}
						id="note-description"
						value={description}
						onChange={(e) => updateDescription(e.target.value)}
					/>
				</div>
			</div>

			<button
				type="submit"
				className="bg-sky-500 w-full rounded-md text-white py-2 hover:bg-sky-700 hover:cursor-pointer"
			>
				{submitButtonText}
			</button>
		</form>
	);
}

export default NoteForm;
