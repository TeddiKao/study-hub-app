import { BubbleMenu } from "@tiptap/react/menus"
import type { Editor } from "@tiptap/react"

function EditorBubbleMenu(editor: Editor) {
    return (
        <BubbleMenu editor={editor} options={{
            placement: "bottom",
            offset: 8
        }}>
            
        </BubbleMenu>
    )
}

export default EditorBubbleMenu
