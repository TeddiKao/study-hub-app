import { useEffect, useRef } from "react";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm.stores";
import { useEditNotebookFormStore } from "../stores/editNotebookForm.stores";
import { useNotebooksStore } from "../stores/notebooks.stores";
import { retrieveNotebook } from "../utils/notebooks.services";
import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NotebookFormProps {
	mode: "create" | "edit";
	notebookId?: number;
}

function NotebookForm({ mode, notebookId }: NotebookFormProps) {
	const createNotebookFormStore = useCreateNotebookFormStore();
	const editNotebookFormStore = useEditNotebookFormStore();

	const usedStore =
		mode === "create" ? createNotebookFormStore : editNotebookFormStore;
	const name = usedStore.name;
	const description = usedStore.description;
	const handleNameChange = usedStore.handleNameChange;
	const handleDescriptionChange = usedStore.handleDescriptionChange;
	const updateName = usedStore.updateName;
	const updateDescription = usedStore.updateDescription;

	const { handleNotebookCreate, handleNotebookEdit } = useNotebooksStore();

	const { data, isLoading, error } = useQuery({
		queryKey: ["notebookInfo", notebookId],
		queryFn: async () => {
			if (!notebookId) return;

			const notebookRetrieveResponse = await retrieveNotebook(notebookId);
			if (!notebookRetrieveResponse.success) {
				throw new Error(notebookRetrieveResponse.error);
			}

			return notebookRetrieveResponse;
		},

		staleTime: 1000 * 5 * 60,

		refetchOnReconnect: true,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});

	const hasHydratedRef = useRef(false);

	useEffect(() => {
		hasHydratedRef.current = false;
	}, [data]);

	useEffect(() => {
		if (hasHydratedRef.current) return;
		if (!data?.success) return;
		if (mode !== "edit") return;

		updateName(data.retrievedNotebook.name);
		updateDescription(data.retrievedNotebook.description);

		hasHydratedRef.current = true;
	}, [data, updateName, updateDescription]);

	if (isLoading) {
		return <div>Retrieving notebook</div>;
	}

	if (error) {
		return <div>An error occured while retrieving notebook</div>;
	}

	const nameFieldPlaceholder =
		mode === "create" ? "Notebook name" : "New name";
	const descriptionFieldPlaceholder =
		mode === "create"
			? "Briefly describe what this notebook is about"
			: "New description";
	const submitButtonText =
		mode === "create" ? "Create notebook" : "Save changes";

    async function handleCreateNotebookFormSubmit() {

    }

    async function handleEditNotebookFormSubmit() {

    }

    async function handleFormSubmit() {
        if (mode === "create") {
            await handleCreateNotebookFormSubmit();
        } else if (mode === "edit") {
            await handleEditNotebookFormSubmit();
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
					placeholder={nameFieldPlaceholder}
					onChange={handleNameChange}
				/>
			</div>

			<div className="flex flex-col mb-2">
				<Label htmlFor="notebook-description" className="mb-1">
					Description
				</Label>
				<Textarea
					id="notebook-description"
					placeholder={descriptionFieldPlaceholder}
					value={description}
					onChange={handleDescriptionChange}
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

export default NotebookForm;
