import { Editor } from "@tiptap/react";
import { useEffect } from "react";
import { getSelectedNode } from "../../utils/nodes.utils";
import { useEditorStateStore } from "../../stores/editorState.stores";

function useEditorContentUpdate(editor: Editor) {
    const { selectedBlockId, selectedBlockType, updateSelectedBlockContent } =
        useEditorStateStore();

    useEffect(() => {
        const handler = async () => {
            if (!selectedBlockId) return;
            if (!selectedBlockType) return;

            const selectedNode = getSelectedNode(editor);

            updateSelectedBlockContent(selectedNode.toJSON().content);
        };

        editor?.on("update", handler);

        return () => {
            editor?.off("update", handler);
        };
    }, [
        editor,
        selectedBlockId,
        selectedBlockType,
        updateSelectedBlockContent,
    ]);
}

export default useEditorContentUpdate;