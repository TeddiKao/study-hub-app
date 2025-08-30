import { useEffect, useRef, type FormEvent } from "react";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm.stores";
import { useEditNotebookFormStore } from "../stores/editNotebookForm.stores";
import { retrieveNotebook } from "../../utils/notebooks.services";
import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useNotebookMutations from "../hooks/useNotebookMutations.hooks";

interface NotebookFormCreateModeProps {
    mode: "create";
}

interface NotebookFormEditModeProps {
    mode: "edit";
    notebookId: number;
}

type NotebookFormProps =
    | NotebookFormCreateModeProps
    | NotebookFormEditModeProps;

function NotebookForm(props: NotebookFormProps) {
    const { mode } = props;
    const notebookId = mode === "edit" ? props.notebookId : undefined;

    const createNotebookFormStore = useCreateNotebookFormStore();
    const editNotebookFormStore = useEditNotebookFormStore();

    const usedStore =
        mode === "create" ? createNotebookFormStore : editNotebookFormStore;

    const name = usedStore.name;
    const description = usedStore.description;
    const updateName = usedStore.updateName;
    const updateDescription = usedStore.updateDescription;
    const updateFormVisibility = usedStore.updateFormVisibility;
    const clearDetails = usedStore.clearDetails;

    const { handleNotebookCreate, handleNotebookEdit } = useNotebookMutations();

    const { data, isLoading, error } = useQuery({
        queryKey: ["notebookInfo", notebookId],
        queryFn: async () => {
            const notebookRetrieveResponse = await retrieveNotebook(
                notebookId!
            );
            if (!notebookRetrieveResponse.success) {
                throw new Error(notebookRetrieveResponse.error);
            }

            return notebookRetrieveResponse;
        },

        staleTime: 1000 * 5 * 60,
        enabled: !!notebookId,

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
        return <div>An error occurred while retrieving notebook</div>;
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
        try {
            await handleNotebookCreate({
                name: name,
                description: description,
                notebookColor: "#FFA500",
            });
        } catch (error) {
            throw new Error("Failed to create notebook");
        }
    }

    async function handleEditNotebookFormSubmit() {
        if (!notebookId) {
            throw new Error("Missing notebook ID when editing notebook");
        }

        try {
            await handleNotebookEdit(notebookId, {
                name: name,
                description: description,
                notebookColor: "#FFA500",
            });
        } catch (error) {
            throw new Error("Failed to edit notebook");
        }
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (mode === "create") {
                await handleCreateNotebookFormSubmit();
            } else if (mode === "edit") {
                await handleEditNotebookFormSubmit();
            }

            updateFormVisibility(false);
            clearDetails();
        } catch (error) {
            if (mode === "create") {
                console.error("Failed to create notebook");
            } else if (mode === "edit") {
                console.error("Failed to edit notebook");
            }
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
                    onChange={(e) => updateName(e.target.value)}
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
                    onChange={(e) => updateDescription(e.target.value)}
                />
            </div>

            <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                className="bg-sky-500 w-full rounded-md text-white py-2 hover:bg-sky-700 hover:cursor-pointer"
            >
                {submitButtonText}
            </button>
        </form>
    );
}

export default NotebookForm;
