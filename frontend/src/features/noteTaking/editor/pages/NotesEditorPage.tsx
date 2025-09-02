import { EditorContent, useEditor } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import DashboardLayout from "@/shared/components/wrappers/DashboardLayout";
import Heading from "@tiptap/extension-heading";
import { Title } from "../extensions/Title.node";
import { Placeholder } from "@tiptap/extensions";

function NotesEditorPage() {
    const editor = useEditor({
        extensions: [
            Document,
            Title,
            Paragraph,
            Text,
            Bold,
            Italic,
            Underline,
            Heading.configure({ levels: [1, 2, 3] }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === "title") {
                        return "Enter title";
                    } else if (node.type.name === "paragraph") {
                        return "Enter some text";
                    }

                    return "Enter content";
                },
            }),
        ],
        content: {
            type: "doc",
            content: [
                {
                    type: "title",
                    content: [],
                },
            ],
        },
    });

    return (
        <DashboardLayout className="gap-16">
            <div className="flex flex-col grow-1">
                <EditorContent className="notes-editor mt-16" editor={editor} />
            </div>
        </DashboardLayout>
    );
}

export default NotesEditorPage;
