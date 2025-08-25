import { Button } from "@/components/ui/button";
import AddIcon from "@/shared/components/icons/AddIcon";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";

function NotesPage() {
	return (
		<DashboardLayout className="gap-4">
			<div className="flex flex-row items-center justify-between mt-3 pr-8">
				<h1 className="text-3xl font-semibold">Notes</h1>
				<Button
					type="button"
					className="hover:cursor-pointer"
				>
					<AddIcon /> <span className="-ml-0.5">New note</span>
				</Button>
			</div>
		</DashboardLayout>
	);
}

export default NotesPage;
