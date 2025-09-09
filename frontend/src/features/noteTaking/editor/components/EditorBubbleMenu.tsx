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
                        strokeWidth={1.5}
                        className={getIconColorClass()}
                    />
                );

            case "italic":
                return (
                    <Italic
                        size={20}
                        strokeWidth={1.5}
                        className={getIconColorClass()}
                    />
                );

            case "underline":
                return (
                    <Underline
                        size={20}
                        strokeWidth={1.5}
                        className={getIconColorClass()}
                    />
                );

            default:
                return null;
        }
    }

    function getActiveClass() {
        return isActive
            ? "bg-sky-500 hover:bg-sky-700"
            : "bg-white hover:bg-gray-300";
    }

    function getIconColorClass() {
        return isActive ? "stroke-white" : "stroke-gray-500";
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
                "border-none outline-none p-1 rounded-md",
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
            <div className="flex flex-row p-1 bg-white shadow-md rounded-md">
                <MarkButton
                    editor={editor}
                    markName="bold"
                    isActive={editor.isActive("bold")}
                />

                <MarkButton
                    editor={editor}
                    markName="italic"
                    isActive={editor.isActive("italic")}
                />

                <MarkButton
                    editor={editor}
                    markName="underline"
                    isActive={editor.isActive("underline")}
                />
            </div>
        </BubbleMenu>
    );
}

export default EditorBubbleMenu;
