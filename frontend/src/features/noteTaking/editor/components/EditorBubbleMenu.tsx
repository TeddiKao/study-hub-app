import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";
import { toggleMark } from "../utils/marks.utils";
import clsx from "clsx";
import type { MarkName } from "../types/editor.types";

interface EditorBubbleMenuProps {
    editor: Editor | null;
}

interface MarkButtonProps {
    editor: Editor | null;
    markName: MarkName;
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

    const activeClasses = isActive
        ? "bg-gray-300 hover:bg-gray-400"
        : "bg-white hover:bg-gray-300";

    return (
        <button
            onClick={() => toggleMark(editor, markName)}
            type="button"
            aria-label={`Toggle ${markName}`}
            aria-pressed={isActive}
            className={clsx(
                "border-none outline-none p-1.5 rounded-md hover:cursor-pointer",
                activeClasses
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
