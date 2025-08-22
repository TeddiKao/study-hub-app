interface NotebookDropdownMenuProps {
	notebookId: number;
}

function NotebookDropdownMenu({ notebookId }: NotebookDropdownMenuProps) {
	const {
		isFormVisible,
		updateFormVisibility,
		activeNotebookId,
		updateActiveNotebookId,
	} = useEditNotebookFormStore();

	const queryClient = useQueryClient();

	const isNotebookActive = notebookId === activeNotebookId;

	return (
		<Dialog
			open={isFormVisible && isNotebookActive}
			onOpenChange={updateFormVisibility}
		>
			<AlertDialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							aria-label="Notebook actions"
							className="py-0.5 rounded-sm hover:cursor-pointer hover:bg-gray-300"
						>
							<KebabMenuIcon size={20} />
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						side="right"
						align="start"
						alignOffset={-8}
					>
						<DropdownMenuItem asChild>
							<DialogTrigger
								onClick={() => {
									updateActiveNotebookId(notebookId);
									queryClient.invalidateQueries({
										queryKey: ["notebookInfo", notebookId],
									});
								}}
								className="w-full"
							>
								Edit
							</DialogTrigger>
						</DropdownMenuItem>
						<DropdownMenuItem asChild variant="destructive">
							<AlertDialogTrigger className="w-full">
								Delete
							</AlertDialogTrigger>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DeleteNotebookAlertDialog notebookId={notebookId} />
			</AlertDialog>

			<NotebookDialog mode="edit" notebookId={notebookId} />
		</Dialog>
	);
}

export default NotebookDropdownMenu;