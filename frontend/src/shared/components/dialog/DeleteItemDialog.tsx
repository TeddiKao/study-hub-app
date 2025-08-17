import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteItemDialogProps {
	dialogTitle: string;
	dialogDescription: string;
	dialogAction: () => void | Promise<void>;
}

function DeleteItemDialog({
	dialogTitle,
	dialogDescription,
	dialogAction,
}: DeleteItemDialogProps) {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
				<AlertDialogDescription>
					{dialogDescription}
				</AlertDialogDescription>
			</AlertDialogHeader>

			<AlertDialogFooter>
				<AlertDialogCancel className="hover:cursor-pointer">
					Cancel
				</AlertDialogCancel>
				<AlertDialogAction
					onClick={dialogAction}
					className="bg-red-500 hover:bg-red-900 hover:cursor-pointer"
				>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}

export default DeleteItemDialog;
