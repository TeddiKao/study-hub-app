import { BubbleMenu } from "@tiptap/react/menus"
import type { Editor } from "@tiptap/react"
import { Bold, Italic, Underline } from "lucide-react"

interface EditorBubbleMenuProps {
    editor: Editor
}

function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
    return (
        <BubbleMenu editor={editor} options={{
            placement: "bottom",
            offset: 8
        }}>
            <div className="flex flex-row p-1 gap-1 bg-white shadow-md rounded-md">
                <button type="button" className="hover:cursor-pointer bg-white border-none outline-none">
                    <Bold strokeWidth={1.5} />
                </button>
                <button type="button" className="hover:cursor-pointer bg-white border-none outline-none">
                    <Italic strokeWidth={1.5} />
                </button>
                <button type="button" className="hover:cursor-pointer bg-white border-none outline-none">
                    <Underline strokeWidth={1.5} />
                </button>
            </div>
        </BubbleMenu>
    )
}

export default EditorBubbleMenu
