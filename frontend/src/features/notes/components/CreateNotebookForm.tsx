import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CreateNotebookForm() {
	return (
		<form className="flex flex-col p-2">
			<div className="flex flex-col mb-2">
				<Label htmlFor="notebook-name" className="mb-1">Name</Label>
				<Input
					type="text"
					id="notebook-name"
					placeholder="Notebook name"
				/>
			</div>

			<div className="flex flex-col mb-2">
				<Label htmlFor="notebook-description" className="mb-1">Description</Label>
				<Textarea
					id="notebook-description"
					placeholder="Briefly describe what this notebook is about"
				/>
			</div>

			<button type="submit" className="bg-sky-500 w-full py-2 hover:bg-sky-700">
				Create notebook
			</button>
		</form>
	);
}

export default CreateNotebookForm;
