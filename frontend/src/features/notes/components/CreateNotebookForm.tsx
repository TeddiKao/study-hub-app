import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm.stores";
import type { FormEvent } from "react";
import { useNotebooksStore } from "../stores/notebooks.stores";

function CreateNotebookForm() {
	const {
		name,
		description,
		handleNameChange,
		handleDescriptionChange,
		clearDetails,
		updateFormVisiblity
	} = useCreateNotebookFormStore();
	const { handleNotebookCreate } = useNotebooksStore();

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			await handleNotebookCreate({
				name: name,
				description: description,
				notebookColor: "#FFA500",
			});

			updateFormVisiblity(false);
			clearDetails();
		} catch (error) {
			console.error("Failed to create notebook")
		}
	}

	return (
		<form className="flex flex-col p-2" onSubmit={handleFormSubmit}>
			<div className="flex flex-col mb-2">
				<Label htmlFor="notebook-name" className="mb-1">
					Name
				</Label>
				<Input
					type="text"
					id="notebook-name"
					value={name}
					placeholder="Notebook name"
					onChange={handleNameChange}
				/>
			</div>

			<div className="flex flex-col mb-2">
				<Label htmlFor="notebook-description" className="mb-1">
					Description
				</Label>
				<Textarea
					id="notebook-description"
					placeholder="Briefly describe what this notebook is about"
					value={description}
					onChange={handleDescriptionChange}
				/>
			</div>

			<button
				type="submit"
				className="bg-sky-500 w-full rounded-md text-white py-2 hover:bg-sky-700 hover:cursor-pointer"
			>
				Create notebook
			</button>
		</form>
	);
}

export default CreateNotebookForm;
