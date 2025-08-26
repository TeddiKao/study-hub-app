import { Button } from "@/components/ui/button";
import AddIcon from "@/shared/components/icons/AddIcon";
import KebabMenuIcon from "@/shared/components/icons/KebabMenuIcon";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import { StickyNote } from "lucide-react";

function NotesPage() {
	return (
		<DashboardLayout className="gap-4 pr-4">
			<div className="flex flex-col">
				<div className="flex flex-row items-center justify-between mt-3">
					<h1 className="text-3xl font-semibold">Notes</h1>
					<Button type="button" className="hover:cursor-pointer">
						<AddIcon /> <span className="-ml-0.5">New note</span>
					</Button>
				</div>

				<div className="flex flex-col">
					<div className="flex flex-row bg-white shadow-md">
						<StickyNote className="w-6 h-6" />
						<p>Chapter 5</p>
						<KebabMenuIcon className="w-6 h-6" />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

export default NotesPage;
