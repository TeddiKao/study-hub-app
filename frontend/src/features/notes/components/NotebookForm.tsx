import { useCreateNotebookFormStore } from "../stores/createNotebookForm.stores";
import { useEditNotebookFormStore } from "../stores/editNotebookForm.stores";

interface NotebookFormProps {
    mode: "create" | "edit",
    notebookId: number
}

function NotebookForm({ mode, notebookId }: NotebookFormProps) {
    const createNotebookFormStore = useCreateNotebookFormStore();
    const editNotebookFormStore = useEditNotebookFormStore();

    const usedStore = mode === "create" ? createNotebookFormStore : editNotebookFormStore
    const name = usedStore.name
    const description = usedStore.description
    const handleNameChange = usedStore.handleNameChange
    const handleDescriptionChange = usedStore.handleDescriptionChange
}

export default NotebookForm;