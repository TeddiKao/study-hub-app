import { isNullOrUndefined } from "@/shared/utils/types.utils";
import type { JSONContent } from "@tiptap/react";
import { Node as ProseMirrorNode } from "prosemirror-model";

function getDeletedNodeIds(oldDoc: ProseMirrorNode, newDoc: ProseMirrorNode) {
    const oldDocContent = oldDoc.toJSON().content;
    const newDocContent = newDoc.toJSON().content;

    const deletedNodeIds: Set<number> = new Set();

    oldDocContent.forEach((oldNode: JSONContent) => {
        const oldNodeAttrs = oldNode.attrs;
        const { id: oldNodeId, tempBlockId: oldTempBlockId } = oldNodeAttrs ?? {};

        const newNode = newDocContent.find((node: JSONContent) => {
            const newNodeAttrs = node.attrs;
            const { id: newNodeId, tempBlockId: newTempBlockId } =
                newNodeAttrs ?? {};

            return newNodeId === oldNodeId || newTempBlockId === oldTempBlockId;
        });

        if (isNullOrUndefined(newNode) && !isNullOrUndefined(oldNodeId)) {
            deletedNodeIds.add(oldNodeId);
        }
    });

    return deletedNodeIds;
}

export { getDeletedNodeIds };
