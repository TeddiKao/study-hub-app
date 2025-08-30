import { Dialog } from "@/components/ui/dialog";
import { useCreateNotebookFormStore } from "../../../stores/notebooks/createNotebookForm.stores";
import NotebookDialog from "../../components/NotebookDialog";
import CreateNotebookButton from "./components/CreateNotebookButton";
import NotebookGrid from "./components/NotebookGrid";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import useNotebooksQuery from "../../../hooks/query/useNotebooksQuery.hooks";

function NotebooksPage() {
    const { isFormVisible, updateFormVisibility } =
        useCreateNotebookFormStore();

    const { isLoading, error } = useNotebooksQuery();

    if (isLoading) {
        return <div>Fetching notebooks ...</div>;
    }

    if (error) {
        return <div>An error occurred while fetching notebooks</div>;
    }

    return (
        <DashboardLayout className="gap-4">
            <div className="flex flex-col">
                <div className="flex flex-row mt-3 gap-4">
                    <h1 className="font-bold text-3xl">Notebooks</h1>

                    <Dialog
                        open={isFormVisible}
                        onOpenChange={updateFormVisibility}
                    >
                        <CreateNotebookButton />
                        <NotebookDialog mode="create" />
                    </Dialog>
                </div>

                <NotebookGrid />
            </div>
        </DashboardLayout>
    );
}

export default NotebooksPage;
