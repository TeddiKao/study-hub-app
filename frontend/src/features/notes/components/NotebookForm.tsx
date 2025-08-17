import { useEffect, useRef } from "react";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm.stores";
import { useEditNotebookFormStore } from "../stores/editNotebookForm.stores";
import { useNotebooksStore } from "../stores/notebooks.stores";
import { retrieveNotebook } from "../utils/notebooks.services";
import { useQuery } from "@tanstack/react-query";

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
        hasHydratedRef.current = false
    }, [data]);

    useEffect(() => {
        if (hasHydratedRef.current) return;
        if (!data?.success) return;
        if (mode !== "edit") return;
        
        updateName(data.retrievedNotebook.name);
        updateDescription(data.retrievedNotebook.description);

        hasHydratedRef.current = true
    }, [data, updateName, updateDescription])
}

export default NotebookForm;
