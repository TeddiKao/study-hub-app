import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";

function NotebooksPage() {
	return (
		<div className="flex flex-row gap-4">
			<Navbar />
			<div className="flex flex-col">
				<h1 className="font-bold text-3xl mt-2">Notebooks</h1>

				<div className="flex flex-row">
					<div className="flex flex-col bg-white">
						<NotebookIcon size={80} className="" />
                        <p className="font-semibold">History</p>
                        <p className="text-gray-400">12 notes</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotebooksPage;
