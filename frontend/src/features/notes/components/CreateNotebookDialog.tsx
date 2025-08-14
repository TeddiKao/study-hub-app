import { DialogContent, DialogDescription } from "@radix-ui/react-dialog";
import CreateNotebookForm from "./CreateNotebookForm";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

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