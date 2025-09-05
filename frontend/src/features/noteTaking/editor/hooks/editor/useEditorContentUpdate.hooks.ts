import { Editor } from "@tiptap/react";
import { useEffect } from "react";
import { getSelectedNode } from "../../utils/nodes.utils";
import { useEditorStateStore } from "../../stores/editorState.stores";
import useEditorEventListener from "./useEditorEventListener.hooks";

function useEditorContentUpdate(editor: Editor) {
    const { selectedBlockId, selectedBlockType, updateSelectedBlockContent } =
        useEditorStateStore();

    useEffect(() => {
        const handler = async () => {
            if (!selectedBlockId) return;
            if (!selectedBlockType) return;

            const selectedNode = getSelectedNode(editor);
            if (!selectedNode) return;

            updateSelectedBlockContent(selectedNode.toJSON().content);
        };

        useEditorEventListener(editor, "update", handler);
    }, [
        editor,
        selectedBlockId,
        selectedBlockType,
        updateSelectedBlockContent,
    ]);
}

export default useEditorContentUpdate;