import { EditorContent, useEditor } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

function NotesEditorPage() {
    const editor = useEditor({
        extensions: [Document, Paragraph, Text, Bold, Italic, Underline],
        content: "<p>Hello World</p>",
    });

    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
}

export default NotesEditorPage;
