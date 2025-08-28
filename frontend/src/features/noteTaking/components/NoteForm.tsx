import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormEvent } from "react";

function NoteForm() {
	function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// Handle form submission logic here
	}

	return (
		<form className="flex flex-col p-2 gap-2" onSubmit={handleFormSubmit}>
			<div className="flex flex-col">
				<Label htmlFor="note-name">Note Name</Label>
				<Input name="note-name" type="text" />
			</div>

			<div className="flex flex-col">
				<Label htmlFor="note-description">Note Description</Label>
				<Textarea id="note-description" />
			</div>

			<button
				type="submit"
				className="bg-sky-500 w-full rounded-md text-white py-2 hover:bg-sky-700 hover:cursor-pointer"
			>
				Create note
			</button>
		</form>
	);
}

export default NoteForm;
