import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditNotebookFormStore } from "../../stores/editNotebookForm.stores";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { retrieveNotebook } from "../../utils/notebooks.services";
import { useNotebooksStore } from "../../stores/notebooks.stores";

interface EditNotebookFormProps {
	notebookId: number;
}

function EditNotebookForm({ notebookId }: EditNotebookFormProps) {
	const {
		name,
		description,
		handleNameChange,
		handleDescriptionChange,
		updateName,
		updateDescription,
		updateFormVisiblity,
		clearActiveNotebookId,
		clearDetails
	} = useEditNotebookFormStore();
	const { handleNotebookEdit } = useNotebooksStore();
	
	const { data, isLoading, error } = useQuery({
		queryKey: ["notebookInfo", notebookId],
		queryFn: async () => {
			const notebookRetrieveResponse = await retrieveNotebook(notebookId);
			if (!notebookRetrieveResponse.success) {
				throw new Error(notebookRetrieveResponse.error);
			}

			return notebookRetrieveResponse
		},

		staleTime: 1000 * 5 * 60,

		refetchOnReconnect: true,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (!data?.success) {
			return;
		}

		updateName(data.retrievedNotebook.name ?? "")
		updateDescription(data.retrievedNotebook.description ?? "")
	}, [data]);

	if (isLoading) {
		return <div>Retrieving notebook info</div>
	}

	if (error) {
		return <div>An error occured while retrieving notebooks</div>
	}

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			await handleNotebookEdit(notebookId, {
				name: name,
				description: description,
				notebookColor: "#FFA500"
			});

			updateFormVisiblity(false);
			clearActiveNotebookId();
			clearDetails();
		} catch (error) {
			console.error("Failed to edit notebook");
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
