import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";

function NotebooksPage() {
	return (
		<div className="flex flex-row gap-4">
			<Navbar />
			<div className="flex flex-col">
				<h1 className="font-bold text-3xl mt-2">Notebooks</h1>

				<div className="flex flex-row mt-2">
					<button className="flex flex-col pb-2 bg-white rounded-2xl shadow-xl">
						<div className="w-[180px] h-[180px] rounded-t-2xl bg-gray-100 flex flex-row items-center justify-center">
							<NotebookIcon size={120} className="" />
						</div>

						<div className="flex flex-col ml-3">
							<p className="font-semibold mt-2 text-left">History</p>
							<p className="text-gray-400 text-left">12 notes</p>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}

export default NotebooksPage;
