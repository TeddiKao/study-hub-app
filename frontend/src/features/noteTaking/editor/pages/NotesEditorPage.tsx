import { EditorContent, useEditor } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";

function NotesEditorPage() {
    const editor = useEditor({
        extensions: [Bold, Italic, Underline],
    });

    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
}

export default NotesEditorPage;
