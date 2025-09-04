import { Editor } from "@tiptap/react";
import { useEffect } from "react";
import { getSelectedNode } from "../utils/nodes.utils";
import { useEditorStateStore } from "../stores/editorState.stores";

function useEditorContentUpdate(editor: Editor) {
    const {
        selectedBlockId,
        selectedBlockType,
        updateSelectedBlockContent,
    } = useEditorStateStore();

    useEffect(() => {
        editor?.on("update", async () => {
            if (!selectedBlockId) return;
            if (!selectedBlockType) return;

            const selectedNode = getSelectedNode(editor);

            updateSelectedBlockContent(selectedNode.toJSON().content);
        });

        return () => {
            editor?.off("update");
        };
    }, [
        editor,
        selectedBlockId,
        selectedBlockType,
        updateSelectedBlockContent,
    ]);
}

export default useEditorContentUpdate;