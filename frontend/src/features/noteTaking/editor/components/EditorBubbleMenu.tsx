import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";
import {
    toggleBold,
    toggleItalic,
    toggleUnderline,
} from "../utils/marks.utils";
import clsx from "clsx";

interface EditorBubbleMenuProps {
    editor: Editor | null;
}

interface MarkButtonProps {
    editor: Editor | null;
    markName: string;
    isActive: boolean;
}

function MarkButton({ editor, markName, isActive }: MarkButtonProps) {
    if (!editor) return null;

    function getMarkIcon() {
        switch (markName) {
            case "bold":
                return (
                    <Bold
                        size={20}
                        strokeWidth={isActive ? 2 : 1.5}
                        className="stroke-gray-500"
                    />
                );

            case "italic":
                return (
                    <Italic
                        size={20}
                        strokeWidth={isActive ? 2 : 1.5}
                        className="stroke-gray-500"
                    />
                );

            case "underline":
                return (
                    <Underline
                        size={20}
                        strokeWidth={isActive ? 2 : 1.5}
                        className="stroke-gray-500"
                    />
                );

            default:
                return null;
        }
    }

    function getActiveClass() {
        return isActive
            ? "bg-gray-300 hover:bg-gray-400"
            : "bg-white hover:bg-gray-300";
    }

    function handleMarkButtonClick() {
        switch (markName) {
            case "bold":
                toggleBold(editor!);
                break;

            case "italic":
                toggleItalic(editor!);
                break;

            case "underline":
                toggleUnderline(editor!);
                break;
        }
    }

    return (
        <button
            onClick={handleMarkButtonClick}
            type="button"
            className={clsx(
                "border-none outline-none p-1.5 rounded-md hover:cursor-pointer",
                getActiveClass()
            )}
        >
            {getMarkIcon()}
        </button>
    );
}

function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
    if (!editor) return null;

    return (
        <BubbleMenu
            editor={editor}
            options={{
                placement: "bottom",
                offset: 8,
            }}
        >
            <div className="flex flex-row p-1 gap-1 bg-white shadow-md rounded-md">
                {["bold", "italic", "underline"].map((markName) => (
                    <MarkButton
                        key={markName}
                        editor={editor}
                        markName={markName}
                        isActive={editor.isActive(markName)}
                    />
                ))}
            </div>
        </BubbleMenu>
    );
}

export default EditorBubbleMenu;
