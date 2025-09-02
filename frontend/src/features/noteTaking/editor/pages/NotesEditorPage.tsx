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
import { useParams } from "react-router-dom";
import useBlocksQuery from "../hooks/useBlocksQuery.hooks";
import { useEffect } from "react";
import { useBlocksStore } from "../stores/blocks.stores";
import { isNullOrUndefined } from "@/shared/utils/types.utils";

function NotesEditorPage() {
    const { noteId } = useParams();
    const { data: blocks, isLoading, error } = useBlocksQuery();
    const { updateCurrentNoteId, clearCurrentNoteId } = useBlocksStore();

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
    });

    useEffect(() => {
        if (!isNullOrUndefined(noteId)) {
            updateCurrentNoteId(Number(noteId));
        }

        return () => {
            clearCurrentNoteId();
        };
    }, [noteId]);

    useEffect(() => {
        if (!blocks) return;
        if (!editor) return;

        editor.commands.setContent({
            type: "doc",
            content: blocks,
        });
    }, [blocks, editor]);

    if (isLoading) {
        return <div>Fetching blocks ...</div>
    }

    if (error) {
        return <div>An error occurred while fetching blocks</div>
    }

    return (
        <DashboardLayout className="gap-16">
            <div className="flex flex-col grow-1">
                <EditorContent className="notes-editor mt-16" editor={editor} />
            </div>
        </DashboardLayout>
    );
}

export default NotesEditorPage;
