import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import NotebookDropdownMenu from "./NotebookDropdownmenu";

interface NotebookProps {
	notebookName: string;
	notebookId: number;
	notebookColor: string;
}

function NotebookCard({ notebookName, notebookId, notebookColor }: NotebookProps) {
	return (
		<div
			// aria-label="open-notebook-button"
			// role="button"
			className="flex flex-row py-3 pl-3 pr-2 bg-white rounded-2xl shadow-xl items-center"
		>
			<div
				style={{ backgroundColor: notebookColor }}
				className="p-1 w-max h-max rounded-md bg-gray-300"
			>
				<NotebookIcon size={20} />
			</div>

			<div className="flex flex-col flex-1 min-w-0 ml-3 mr-3">
				<p className="font-semibold text-left break-words">
					{notebookName}
				</p>

				<div className="flex flex-row justify-between items-center">
					<p className="text-gray-400 text-left">0 notes</p>
				</div>
			</div>

			<NotebookDropdownMenu notebookId={notebookId} />
		</div>
	);
}


export default NotebookCard;