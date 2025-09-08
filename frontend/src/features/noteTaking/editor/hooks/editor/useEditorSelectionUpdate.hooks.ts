import { isNullOrUndefined } from "@/shared/utils/types.utils";
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
        selectedBlockPosition,
        updateSelectedBlockPosition,
    } = useEditorStateStore();
    const { handleBlockUpdate } = useBlockMutations();

    const handler = async () => {
        const shouldUpdatetoDB =
            !isNullOrUndefined(selectedBlockId) &&
            !isNullOrUndefined(selectedBlockContent) &&
            !isNullOrUndefined(selectedBlockType) &&
            !isNullOrUndefined(selectedBlockPosition);

        const currentlySelectedNode = getSelectedNode(editor);
        if (!currentlySelectedNode) return;

        const { id, position } = currentlySelectedNode.attrs ?? {}
        if (isNullOrUndefined(id)) return;
        if (isNullOrUndefined(position)) return;

        const hasFocusMoved =
            id !== selectedBlockId;

        if (shouldUpdatetoDB && hasFocusMoved) {
            const prevSelectedNodeId = selectedBlockId;
            const prevSelectedBlockContent = selectedBlockContent;
            const prevSelectedBlockType = selectedBlockType;
            const prevSelectedBlockPosition = selectedBlockPosition;

            if (prevSelectedBlockContent?.length === 0) return;

            await handleBlockUpdate(prevSelectedNodeId!, {
                type: prevSelectedBlockType!,
                content: prevSelectedBlockContent!,
                position: prevSelectedBlockPosition!,
            });
        }

        updateSelectedBlockId(id);
        updateSelectedBlockType(currentlySelectedNode.type.name);
        updateSelectedBlockPosition(position);
    };

    useEditorEventListener(editor, "selectionUpdate", handler);
}

export default useEditorSelectionUpdate;
