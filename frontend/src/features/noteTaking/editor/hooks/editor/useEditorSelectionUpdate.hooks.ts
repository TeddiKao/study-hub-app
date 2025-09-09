import { isNullOrUndefined } from "@/shared/utils/types.utils";
import {
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
        updateSelectedBlockContent
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

        if (currentlySelectedNode.type.name === Title.name) {
            if (isNullOrUndefined(selectedBlockOriginalContent)) return;

            if (currentlySelectedNode.content.size === 0) {
                const { id } = currentlySelectedNode.attrs ?? {};
                if (isNullOrUndefined(id)) return;

                const nodePos = getNodePositionById(editor, id);
                if (isNullOrUndefined(nodePos)) return;

                updateNodeContent(
                    editor,
                    currentlySelectedNode,
                    selectedBlockOriginalContent!
                );

                updateSelectedBlockContent(selectedBlockOriginalContent!);
            }
        }

        const { id, position } = currentlySelectedNode.attrs ?? {};
        if (isNullOrUndefined(id)) return;
        if (isNullOrUndefined(position)) return;

        const hasFocusMoved = id !== selectedBlockId;

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
    };

    useEditorEventListener(editor, "selectionUpdate", handler);
}

export default useEditorSelectionUpdate;
