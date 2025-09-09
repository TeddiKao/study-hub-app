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
                <Button type="button" className="hover:cursor-pointer">
                    <Bold />
                </Button>
                <Button type="button" className="hover:cursor-pointer">
                    <Italic />
                </Button>
                <Button type="button" className="hover:cursor-pointer">
                    <Underline />
                </Button>
            </div>
        </BubbleMenu>
    )
}

export default EditorBubbleMenu
