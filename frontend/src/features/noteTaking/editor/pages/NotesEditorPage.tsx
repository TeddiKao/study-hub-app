import { useEditor } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";

function NotesEditorPage() {
    const editor = useEditor({
        extensions: [Bold, Italic, Underline]
    })

    return <div>NotesEditorPage</div>;
}

export default NotesEditorPage;
