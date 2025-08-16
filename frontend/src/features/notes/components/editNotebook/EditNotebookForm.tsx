import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditNotebookFormStore } from "../../stores/editNotebookForm.stores";

interface EditNotebookFormProps {
	notebookId: number,
}

function EditNotebookForm({ notebookId }: EditNotebookFormProps) {
    const { name, description, handleNameChange, handleDescriptionChange } = useEditNotebookFormStore();

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
					placeholder="New name"
					onChange={handleNameChange}
				/>
			</div>

			<div className="flex flex-col mb-2">
				<Label htmlFor="notebook-description" className="mb-1">
					Description
				</Label>
				<Textarea
					id="notebook-description"
					placeholder="New description"
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

export default EditNotebookForm;
