import CreateNotebookForm from "./CreateNotebookForm";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function CreateNotebookDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create notebook</DialogTitle>
                <DialogDescription>Create a notebook here</DialogDescription>
            </DialogHeader>

            <CreateNotebookForm />
        </DialogContent>
    )
}

export default CreateNotebookDialog;