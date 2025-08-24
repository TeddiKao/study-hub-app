import { Dialog } from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import NotebookDialog from "@/features/noteTaking/components/NotebookDialog";
import { useCreateNotebookFormStore } from "@/features/noteTaking/stores/createNotebookForm.stores";
import { useDeleteNotebookAlertStore } from "@/features/noteTaking/stores/deleteNotebookAlert.stores";
import { useEditNotebookFormStore } from "@/features/noteTaking/stores/editNotebookForm.stores";
import { useNotebooksStore } from "@/features/noteTaking/stores/notebooks.stores";
import { fetchNotebooks } from "@/features/noteTaking/utils/notebooks.services";
import DeleteItemDialog from "@/shared/components/dialog/DeleteItemDialog";
import AddIcon from "@/shared/components/icons/AddIcon";
import EditIcon from "@/shared/components/icons/EditIcon";
import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import TrashIcon from "@/shared/components/icons/TrashIcon";
import { expandedItemLinkMap } from "@/shared/constants/expandedItemLinkMap.constants";
import { expandedItemMap } from "@/shared/constants/expandedItemMap.constants";
import {
	useActiveItemStore,
	useDashboardNavbarState,
} from "@/shared/stores/dashboard.stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, type MouseEvent } from "react";
import { Link } from "react-router-dom";

interface ItemProps {
	itemId: number;
	itemType: string;
	itemName: string;
	color: string;
}

interface ViewAllItemsButtonProps {
	link: string;
	label: string;
}

function NotebookEditDialog() {
	const { isFormVisible, updateFormVisibility } = useEditNotebookFormStore();
	const { activeItemId, enableActiveItemIdUpdate } = useActiveItemStore();

	if (!activeItemId) return;

	function onOpenChange(open: boolean) {
		if (!open) {
			updateFormVisibility(false);
			enableActiveItemIdUpdate();
		}
	}

	return (
		<Dialog open={isFormVisible} onOpenChange={onOpenChange}>
			<NotebookDialog mode="edit" notebookId={activeItemId} />
		</Dialog>
	);
}

function CreateNotebookDialog() {
	const { isFormVisible, updateFormVisibility } =
		useCreateNotebookFormStore();
	const { enableActiveItemIdUpdate } = useActiveItemStore();

	function onOpenChange(open: boolean) {
		if (!open) {
			updateFormVisibility(false);
			enableActiveItemIdUpdate();
		}
	}

	return (
		<Dialog open={isFormVisible} onOpenChange={onOpenChange}>
			<NotebookDialog mode="create" />
		</Dialog>
	);
}

function DeleteNotebookAlert() {
	const { activeItemId, enableActiveItemIdUpdate } = useActiveItemStore();
	const { visible: isAlertVisible, closeAlert: hideDeleteNotebookAlert } =
		useDeleteNotebookAlertStore();
	const { handleNotebookDelete } = useNotebooksStore();

	if (!activeItemId) return null;

	async function dialogAction() {
		try {
			await handleNotebookDelete(activeItemId!);
		} catch (error) {
			console.error("Failed to delete notebook");
		}
	}

	function onOpenChange(open: boolean) {
		if (!open) {
			enableActiveItemIdUpdate();
			hideDeleteNotebookAlert();
		}
	}

	return (
		<DeleteItemDialog
			isOpen={isAlertVisible}
			onOpenChange={onOpenChange}
			dialogTitle="Delete notebook?"
			dialogDescription="This will permanently delete your notebook. This cannot be undone"
			dialogAction={dialogAction}
		/>
	);
}

function Item({ itemId, itemType, itemName, color }: ItemProps) {
	const {
		activeItemId,
		canUpdateActiveItemId,
		updateActiveItem,
		updateActiveItemName,
		updateActiveItemType,
		clearActiveItem,
		disableActiveItemIdUpdate,
	} = useActiveItemStore();
	const { updateFormVisibility } = useEditNotebookFormStore();
	const { showAlert: showDeleteNotebookAlert } =
		useDeleteNotebookAlertStore();

	const queryClient = useQueryClient();

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

				console.log("Active item cleared");
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
						onClick={(e: MouseEvent<HTMLButtonElement>) => {
							e.stopPropagation();
							updateFormVisibility(true);
							disableActiveItemIdUpdate();

							queryClient.invalidateQueries({
								queryKey: ["notebookInfo", itemId],
							});
						}}
					>
						<EditIcon size={20} className="fill-gray-500" />
					</button>

					<button
						className="rounded-md hover:cursor-pointer"
						type="button"
						aria-label={`Delete ${itemType} ${itemName}`}
						onClick={(e: MouseEvent) => {
							e.stopPropagation();
							showDeleteNotebookAlert();
							disableActiveItemIdUpdate();
						}}
					>
						<TrashIcon color="hsl(220.03 10% 46%)" size={20} />
					</button>
				</div>
			)}
		</div>
	);
}

function ViewAllItemsButton({ link, label }: ViewAllItemsButtonProps) {
	return (
		<Link
			to={link}
			className="flex flex-row items-center px-1 py-2 rounded-md hover:cursor-pointer hover:bg-gray-300"
		>
			<p className="text-sky-500 ml-1">{label}</p>
		</Link>
	);
}

function ItemsContainer() {
	const { expandedItem } = useDashboardNavbarState();
	const { notebooks } = useNotebooksStore();

	if (!expandedItem) return null;

	function getItemList() {
		switch (expandedItem) {
			case "notebooks":
				return notebooks;

			default:
				return [];
		}
	}

	return (
		<div className="flex flex-col">
			{getItemList().map(({ id, name, notebookColor }) => (
				<Item
					key={id}
					itemId={id}
					itemName={name}
					color={notebookColor}
					itemType={expandedItemMap[expandedItem]}
				/>
			))}
		</div>
	);
}

function NavPanelContent() {
	const { expandedItem } = useDashboardNavbarState();
	const { updateFormVisibility: updateCreateNotebookFormVisibility } =
		useCreateNotebookFormStore();

	if (!expandedItem) return null;

	return (
		<div
			id="dashboard-notebooks-panel"
			role="region"
			aria-labelledby="dashboard-notebooks-trigger"
			className="flex flex-col bg-gray-100 py-3 pl-3 pr-3"
		>
			<div className="flex flex-row items-center justify-between">
				<p className="text-sm text-gray-500 pl-1">Notebooks</p>

				<Tooltip>
					<TooltipTrigger asChild>
						<button
							onClick={() => {
								if (expandedItem === "notebooks") {
									updateCreateNotebookFormVisibility(true);
								}
							}}
							className="p-1 hover:bg-gray-300 hover:cursor-pointer rounded-md"
						>
							<AddIcon size={20} className="fill-gray-500" />
						</button>
					</TooltipTrigger>

					<TooltipContent side="bottom">
						<p>Create notebook</p>
					</TooltipContent>
				</Tooltip>
			</div>

			<ItemsContainer />
			<ViewAllItemsButton
				link={expandedItemLinkMap[expandedItem]}
				label={`View all ${expandedItem}`}
			/>
		</div>
	);
}

function NavPanel() {
	const { expanded, expandedItem } = useDashboardNavbarState();
	const { updateNotebooks } = useNotebooksStore();
	const { activeItemId, activeItemName, activeItemType } =
		useActiveItemStore();

	function getQueryFunction() {
		switch (expandedItem) {
			case "notebooks":
				return async () => {
					try {
						const notebooks = await fetchNotebooks();

						return notebooks;
					} catch (error) {
						throw new Error(
							"Error occurred while fetching notebooks"
						);
					}
				};

			default:
				return async () => null;
		}
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ["dashboardItems", expandedItem],
		queryFn: getQueryFunction(),
		staleTime: 1000 * 60 * 5,
		enabled: !!expanded,

		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});

	useEffect(() => {
		if (!data?.success) return;

		switch (expandedItem) {
			case "notebooks":
				updateNotebooks(data.notebooks);
		}
	}, [data]);

	if (!expanded) return null;
	if (!expandedItem) return null;

	if (isLoading) {
		return <div>Fetching notebooks</div>;
	}

	if (error) {
		return <div>An error occurred while fetching notebooks</div>;
	}

	return (
		<>
			<NavPanelContent />

			{activeItemId &&
				activeItemName &&
				activeItemType === "notebook" && (
					<>
						<NotebookEditDialog />
						<DeleteNotebookAlert />
					</>
				)}

			{expandedItem === "notebooks" && <CreateNotebookDialog />}
		</>
	);
}

export default NavPanel;
