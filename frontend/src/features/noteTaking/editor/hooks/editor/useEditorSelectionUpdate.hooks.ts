import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useEffect } from "react";
import { getSelectedNode } from "../../utils/nodes.utils";
import type { Editor } from "@tiptap/react";
import { useEditorStateStore } from "../../stores/editorState.stores";
import useBlockMutations from "../blocks/useBlockMutations.hooks";
import useEditorEventListener from "./useEditorEventListener.hooks";

function useEditorSelectionUpdate(editor: Editor) {
    const {
        selectedBlockId,
        updateSelectedBlockId,
        selectedBlockContent,
        selectedBlockType,
        updateSelectedBlockType,
        selectedBlockOrder,
        updateSelectedBlockOrder,
    } = useEditorStateStore();
    const { handleBlockUpdate } = useBlockMutations();

    useEffect(() => {
        const handler = async () => {
            const shouldUpdatetoDB =
                !isNullOrUndefined(selectedBlockId) &&
                !isNullOrUndefined(selectedBlockContent) &&
                !isNullOrUndefined(selectedBlockType) &&
                !isNullOrUndefined(selectedBlockOrder);

            const currentlySelectedNode = getSelectedNode(editor);
            if (!currentlySelectedNode) return;

            const hasFocusMoved =
                currentlySelectedNode.attrs.id !== selectedBlockId;

            if (shouldUpdatetoDB && hasFocusMoved) {
                const prevSelectedNodeId = selectedBlockId;
                const prevSelectedBlockContent = selectedBlockContent;
                const prevSelectedBlockType = selectedBlockType;
                const prevSelectedBlockOrder = selectedBlockOrder;

                await handleBlockUpdate(prevSelectedNodeId!, {
                    blockType: prevSelectedBlockType!,
                    blockContent: prevSelectedBlockContent!,
                    blockOrder: prevSelectedBlockOrder!,
                });
            }

            updateSelectedBlockId(currentlySelectedNode.attrs.id);
            updateSelectedBlockType(currentlySelectedNode.type.name);
            updateSelectedBlockOrder(currentlySelectedNode.attrs.position);
        };

        useEditorEventListener(editor, "selectionUpdate", handler);
    }, [
        editor,
        updateSelectedBlockId,
        updateSelectedBlockType,
        updateSelectedBlockOrder,
        selectedBlockId,
        selectedBlockContent,
        selectedBlockType,
        selectedBlockOrder,
    ]);
}

export default useEditorSelectionUpdate;
