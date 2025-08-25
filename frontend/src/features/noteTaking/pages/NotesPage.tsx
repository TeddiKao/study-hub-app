import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";

function NotesPage() {
    return (
        <DashboardLayout className="gap-4">
            <div className="flex flex-row items-center mt-3">
                <h1 className="text-3xl font-semibold">Notes</h1>
            </div>
        </DashboardLayout>
    )
}

export default NotesPage;