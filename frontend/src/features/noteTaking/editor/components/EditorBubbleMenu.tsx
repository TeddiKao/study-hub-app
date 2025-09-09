import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";

interface EditorBubbleMenuProps {
    editor: Editor | null;
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
            <div className="flex flex-row px-2 py-1 gap-1 bg-white shadow-md rounded-md">
                <button
                    type="button"
                    className="hover:cursor-pointer hover:bg-gray-300 bg-white border-none outline-none p-1 rounded-md"
                >
                    <Bold size={20} strokeWidth={1.5} />
                </button>
                <button
                    type="button"
                    className="hover:cursor-pointer hover:bg-gray-300 bg-white border-none outline-none p-1 rounded-md"
                >
                    <Italic size={20} strokeWidth={1.5} />
                </button>
                <button
                    type="button"
                    className="hover:cursor-pointer hover:bg-gray-300 bg-white border-none outline-none p-1 rounded-md"
                >
                    <Underline size={20} strokeWidth={1.5} />
                </button>
            </div>
        </BubbleMenu>
    );
}

export default EditorBubbleMenu;
