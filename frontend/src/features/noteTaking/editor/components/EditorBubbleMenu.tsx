import { BubbleMenu } from "@tiptap/react/menus"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
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
            <div className="flex flex-row">
                <button type="button" className="hover:cursor-pointer">
                    <Bold />
                </button>
                <button type="button" className="hover:cursor-pointer">
                    <Italic />
                </button>
                <button type="button" className="hover:cursor-pointer">
                    <Underline />
                </button>
            </div>
        </BubbleMenu>
    )
}

export default EditorBubbleMenu
