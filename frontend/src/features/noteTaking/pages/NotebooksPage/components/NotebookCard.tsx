import NotebookIcon from "@/shared/components/icons/NotebookIcon";
import NotebookDropdownMenu from "./NotebookDropdownMenu";
import { useNavigate } from "react-router-dom";

interface NotebookProps {
    notebookName: string;
    notebookId: number;
    notebookColor: string;
    noteCount: number;
}

function NotebookCard({
    notebookName,
    notebookId,
    notebookColor,
    noteCount,
}: NotebookProps) {
    const navigate = useNavigate();

    function handleNotebookCardClick() {
        navigate(`/notebooks/${notebookId}`);
    }

    function getNoun() {
        if (noteCount === 1) {
            return "note";
        }

        return "notes";
    }

    return (
        <div
            aria-label={`Open notebook ${notebookName}`}
            className="flex flex-row py-3 pl-3 pr-2 bg-white rounded-2xl shadow-xl items-center hover:cursor-pointer"
        >
            <button
                type="button"
                style={{ backgroundColor: notebookColor }}
                onClick={handleNotebookCardClick}
                aria-label={`Open notebook ${notebookName}`}
                className="p-1 w-max h-max rounded-md bg-gray-300 hover:cursor-pointer"
            >
                <NotebookIcon size={20} />
            </button>

            <button onClick={handleNotebookCardClick} className="flex flex-col flex-1 min-w-0 ml-3 mr-3 hover:cursor-pointer">
                <p className="font-semibold text-left break-words">
                    {notebookName}
                </p>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-400 text-left">
                        {noteCount} {getNoun()}
                    </p>
                </div>
            </button>

            <NotebookDropdownMenu notebookId={notebookId} />
        </div>
    );
}

export default NotebookCard;
