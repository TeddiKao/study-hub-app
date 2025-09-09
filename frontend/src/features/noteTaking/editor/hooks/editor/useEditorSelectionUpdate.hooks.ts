import { isNullOrUndefined } from "@/shared/utils/types.utils";
import {
    getNodeFromDocPosition,
    getNodePositionById,
    getSelectedNode,
    updateNodeContent,
} from "../../utils/nodes.utils";
import type { Editor } from "@tiptap/react";
import { useEditorStateStore } from "../../stores/editorState.stores";
import useBlockMutations from "../blocks/useBlockMutations.hooks";
import useEditorEventListener from "./useEditorEventListener.hooks";
import { Title } from "../../extensions/Title.node";

function useEditorSelectionUpdate(editor: Editor) {
    const {
        selectedBlockId,
        updateSelectedBlockId,
        selectedBlockContent,
        selectedBlockType,
        updateSelectedBlockType,
        selectedBlockPosition,
        updateSelectedBlockPosition,
        selectedBlockOriginalContent,
        updateSelectedBlockContent,
        updateSelectedBlockOriginalContent,
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

        const { id, position } = currentlySelectedNode.attrs ?? {};
        if (isNullOrUndefined(id)) return;
        if (isNullOrUndefined(position)) return;

        const hasFocusMoved = id !== selectedBlockId;

        if (selectedBlockType === Title.name && hasFocusMoved) {
            if (isNullOrUndefined(selectedBlockOriginalContent)) return;

            if ((selectedBlockContent?.length ?? 0) === 0) {
                if (isNullOrUndefined(selectedBlockId)) return;

                const nodePos = getNodePositionById(editor, selectedBlockId!);
                if (isNullOrUndefined(nodePos)) return;

                const node = getNodeFromDocPosition(editor, nodePos!);
                if (isNullOrUndefined(node)) return;

                updateNodeContent(editor, node!, selectedBlockOriginalContent!);

                updateSelectedBlockContent(selectedBlockOriginalContent!);
            }
        }

        if (shouldUpdatetoDB && hasFocusMoved) {
            const prevSelectedNodeId = selectedBlockId;
            const prevSelectedBlockContent = selectedBlockContent;
            const prevSelectedBlockType = selectedBlockType;
            const prevSelectedBlockPosition = selectedBlockPosition;

            if ((prevSelectedBlockContent?.length ?? 0) > 0) {
                await handleBlockUpdate(prevSelectedNodeId!, {
                    type: prevSelectedBlockType!,
                    content: prevSelectedBlockContent!,
                    position: prevSelectedBlockPosition!,
                });
            }
        }

        updateSelectedBlockId(id);
        updateSelectedBlockType(currentlySelectedNode.type.name);
        updateSelectedBlockPosition(position);
        
        if (hasFocusMoved) {
            updateSelectedBlockOriginalContent(
                currentlySelectedNode.content.toJSON() ?? []
            );
        }
    };

    useEditorEventListener(editor, "selectionUpdate", handler);
}

export default useEditorSelectionUpdate;
