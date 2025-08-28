import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormEvent } from "react";
import { useNotesStore } from "../stores/notes/notesStore.stores";
import { useNoteFormStore } from "../stores/notes/noteForm.stores";
import { useCreateNoteDialogStore } from "../stores/notes/noteDialog.stores";

interface NoteFormProps {
	mode: "create" | "edit";
	noteId?: number;
}

function NoteForm({ mode, noteId }: NoteFormProps) {
	const { handleNoteCreate } = useNotesStore();
	const { name, description, updateName, updateDescription, clearDetails } = useNoteFormStore();

	const { closeDialog: closeCreateNoteDialog } = useCreateNoteDialogStore();

	const nameFieldPlaceholder = mode === "create" ? "Note name" : "New name";
	const descriptionFieldPlaceholder =
		mode === "create"
			? "Briefly describe what this note is about"
			: "New description";
	const submitButtonText = mode === "create" ? "Create note" : "Save changes";

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

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (mode === "create") {
			await handleNoteCreation();
		}
	}

	return (
		<form className="flex flex-col p-2 gap-2" onSubmit={handleFormSubmit}>
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
