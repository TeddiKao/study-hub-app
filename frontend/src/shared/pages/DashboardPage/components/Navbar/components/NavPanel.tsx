import { useNotebooksStore } from "@/features/notes/stores/notebooks.stores";
import AddIcon from "@/shared/components/icons/AddIcon";
import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import { useDashboardNavbarState } from "@/shared/stores/dashboard.stores";

interface ItemProps {
	itemType: string;
	itemName: string;
	color: string;
}

function Item({ itemType, itemName, color }: ItemProps) {
	function getItemIcon() {
		switch (itemType) {
			case "notebook":
				return <NotebookIcon className="fill-white" size={20} />;

			default:
				return null;
		}
	}

	return (
		<button
			type="button"
			aria-label={itemName}
			className="flex flex-row mb-0.5 p-1 items-center hover:cursor-pointer hover:bg-gray-300 rounded-md"
		>
			<div
				className="p-1 rounded-sm"
				style={{
					backgroundColor: color,
				}}
			>
				{getItemIcon()}
			</div>
			<p className="ml-2">{itemName}</p>
		</button>
	);
}

function AddNotebookButton() {
	return (
		<button className="flex flex-row items-center px-1 py-2 rounded-md hover:cursor-pointer hover:bg-gray-300">
			<AddIcon size={16} className="fill-sky-500" />
			<p className="text-sky-500 ml-1">Add notebook</p>
		</button>
	);
}

function NavPanel() {
	const { expanded, expandedItem } = useDashboardNavbarState();
	const { notebooks } = useNotebooksStore();

	if (!expanded) return null;
	if (!expandedItem) return null;

	return (
		<div
			id="dashboard-notebooks-panel"
			role="region"
			aria-labelledby="dashboard-notebooks-trigger"
			className="flex flex-col bg-gray-100 py-3 pl-3 pr-10"
		>
			<p className="text-sm text-gray-500 mb-1 pl-1">Notebooks</p>

			<div className="flex flex-row">
				{notebooks.map(({ id, name, notebookColor }) => (
					<Item
						key={id}
						itemName={name}
						color={notebookColor}
						itemType={expandedItem}
					/>
				))}
			</div>

			<AddNotebookButton />
		</div>
	);
}

export default NavPanel;
