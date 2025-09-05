import { Editor } from "@tiptap/react";
import { getSelectedNode } from "../../utils/nodes.utils";
import { useEditorStateStore } from "../../stores/editorState.stores";
import useEditorEventListener from "./useEditorEventListener.hooks";

function useEditorContentUpdate(editor: Editor) {
    const { selectedBlockId, selectedBlockType, updateSelectedBlockContent } =
        useEditorStateStore();

    const handler = async () => {
        if (!selectedBlockId) return;
        if (!selectedBlockType) return;

        const selectedNode = getSelectedNode(editor);
        if (!selectedNode) return;

        const json = selectedNode.toJSON?.();
        const content = Array.isArray(json?.content) ? json?.content : [];

        updateSelectedBlockContent(content);
    };

    useEditorEventListener(editor, "update", handler);
}

export default useEditorContentUpdate;
