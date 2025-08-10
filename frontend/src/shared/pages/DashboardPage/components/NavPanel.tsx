import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import { useDashboardNavbarState } from "@/shared/stores/dashboard.stores";

function NavPanel() {
	const { expanded } = useDashboardNavbarState();

	if (!expanded) return null;

	return (
		<div
			id="dashboard-notebooks-panel"
			role="region"
			aria-labelledby="dashboard-notebooks-trigger"
			className="flex flex-col bg-gray-100 py-3 pl-3 pr-10"
		>
			<p className="text-sm text-gray-500 mb-1 pl-1">Notebooks</p>
			<div className="flex flex-row mb-0.5 p-1 items-center hover:cursor-pointer hover:bg-gray-300 rounded-md">
				<div className="p-1 bg-purple-500 rounded-sm">
					<NotebookIcon className="fill-white" size={20} />
				</div>
				<p className="ml-2">History</p>
			</div>
		</div>
	);
}

export default NavPanel;
