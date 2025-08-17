import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NotebookDialog from "@/features/notes/components/NotebookDialog";
import { useEditNotebookFormStore } from "@/features/notes/stores/editNotebookForm.stores";
import { useNotebooksStore } from "@/features/notes/stores/notebooks.stores";
import DeleteItemDialog from "@/shared/components/dialog/DeleteItemDialog";
import AddIcon from "@/shared/components/icons/AddIcon";
import EditIcon from "@/shared/components/icons/EditIcon";
import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import TrashIcon from "@/shared/components/icons/TrashIcon";
import { expandedItemMap } from "@/shared/constants/expandedItemMap.constants";
import {
	useActiveItemStore,
	useDashboardNavbarState,
} from "@/shared/stores/dashboard.stores";
import { useQueryClient } from "@tanstack/react-query";

interface ItemProps {
	itemId: number;
	itemType: string;
	itemName: string;
	color: string;
}

interface NotebookDeleteAlertProps {
	itemType: string;
	itemName: string;
	itemId: number;
}

interface NotebookEditDialogProps {
	itemId: number
}

function NotebookDeleteAlert({
	itemType,
	itemName,
	itemId,
}: NotebookDeleteAlertProps) {
	const { enableActiveItemIdUpdate, disableActiveItemIdUpdate } =
		useActiveItemStore();
	const { handleNotebookDelete } = useNotebooksStore();

	return (
		<AlertDialog
			onOpenChange={(open) => {
				if (open) {
					disableActiveItemIdUpdate();
				} else {
					enableActiveItemIdUpdate();
				}
			}}
		>
			<AlertDialogTrigger asChild>
				<button
					className="rounded-md hover:cursor-pointer"
					type="button"
					aria-label={`Delete ${itemType} ${itemName}`}
				>
					<TrashIcon color="hsl(220.03 10% 46%)" size={20} />
				</button>
			</AlertDialogTrigger>

			<DeleteItemDialog
				dialogTitle="Delete notebook?"
				dialogDescription="This will permanently delete your notebook. This cannot be undone"
				dialogAction={async () => {
					try {
						await handleNotebookDelete(itemId);
					} catch (error) {
						console.error("Failed to delete notebook");
					}
				}}
			/>
		</AlertDialog>
	);
}

function NotebookEditDialog({
	itemId,
}: NotebookEditDialogProps) {
	return <NotebookDialog mode="edit" notebookId={itemId} />;
}

function Item({ itemId, itemType, itemName, color }: ItemProps) {
	const {
		activeItemId,
		canUpdateActiveItemId,
		updateActiveItem,
		updateActiveItemName,
		updateActiveItemType,
		clearActiveItem,
	} = useActiveItemStore();
	const { updateFormVisibility } = useEditNotebookFormStore();

	function getItemIcon() {
		switch (itemType) {
			case "notebook":
				return <NotebookIcon className="fill-white" size={20} />;

			default:
				return null;
		}
	}

	return (
		<div
			onMouseEnter={() => {
				if (!canUpdateActiveItemId) return;
				updateActiveItem(itemId);
				updateActiveItemName(itemName);
				updateActiveItemType(itemType);
			}}
			onMouseLeave={() => {
				if (!canUpdateActiveItemId) return;
				clearActiveItem();
			}}
			className="flex flex-row gap-3 mb-0.5 p-1 items-center justify-between hover:cursor-pointer hover:bg-gray-300 rounded-md"
		>
			<div className="flex flex-row items-center">
				<div
					className="p-1 rounded-sm"
					style={{
						backgroundColor: color,
					}}
				>
					{getItemIcon()}
				</div>
				<p className="ml-2 shrink-0 ">{itemName}</p>
			</div>

			{activeItemId === itemId && (
				<div className="flex flex-row items-center ml-2 shrink-0">
					<button
						type="button"
						className="ml-0.5 hover:cursor-pointer"
						aria-label={`Edit ${itemType} ${itemName}`}
						onClick={() => updateFormVisibility(true)}
					>
						<EditIcon size={20} className="fill-gray-500" />
					</button>

					<NotebookDeleteAlert
						itemId={itemId}
						itemName={itemName}
						itemType={itemType}
					/>
				</div>
			)}
		</div>
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
	const { isFormVisible, updateFormVisibility } = useEditNotebookFormStore();
	const { activeItemId, activeItemName, activeItemType } =
		useActiveItemStore();
	
	const queryClient = useQueryClient();

	if (!expanded) return null;
	if (!expandedItem) return null;

	return (
		<>
			<div
				id="dashboard-notebooks-panel"
				role="region"
				aria-labelledby="dashboard-notebooks-trigger"
				className="flex flex-col bg-gray-100 py-3 pl-3 pr-3"
			>
				<p className="text-sm text-gray-500 mb-1 pl-1">Notebooks</p>

				<div className="flex flex-col">
					{notebooks.map(({ id, name, notebookColor }) => (
						<Item
							key={id}
							itemId={id}
							itemName={name}
							color={notebookColor}
							itemType={expandedItemMap[expandedItem]}
						/>
					))}
				</div>

				<AddNotebookButton />
			</div>

			{activeItemId && activeItemName && activeItemType && (
				<Dialog
					open={isFormVisible}
					onOpenChange={(open) => {
						updateFormVisibility(open);

						if (open) {
							queryClient.invalidateQueries({
								queryKey: ["notebookInfo", activeItemId]
							})
						}
					}}
				>
					<NotebookEditDialog
						itemId={activeItemId}
					/>
				</Dialog>
			)}
		</>
	);
}

export default NavPanel;
