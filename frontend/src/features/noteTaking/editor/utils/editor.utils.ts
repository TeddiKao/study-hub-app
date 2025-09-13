import { isNullOrUndefined } from "@/shared/utils/types.utils";
import type { Editor, JSONContent } from "@tiptap/react";
import { Node as ProseMirrorNode } from "prosemirror-model";

function getDeletedNodeIds(oldDoc: ProseMirrorNode, newDoc: ProseMirrorNode) {
    const oldDocContent = oldDoc.toJSON().content;
    const newDocContent = newDoc.toJSON().content;

    const deletedNodeIds: Set<number> = new Set();

    oldDocContent.forEach((oldNode: JSONContent) => {
        const oldNodeAttrs = oldNode.attrs;
        const { id: oldNodeId } = oldNodeAttrs ?? {};

        if (typeof oldNodeId !== "number") return;

        const newNode = newDocContent.find((node: JSONContent) => {
            const newNodeAttrs = node.attrs;
            const { id: newNodeId } = newNodeAttrs ?? {};

            return newNodeId === oldNodeId;
        });

        if (
            isNullOrUndefined(newNode) &&
            !isNullOrUndefined(oldNodeId)
        ) {
            deletedNodeIds.add(oldNodeId);
        }
    });

    return deletedNodeIds;
}

function getPreviousNode(editor: Editor, node: ProseMirrorNode): ProseMirrorNode | null {
    let previousNode: ProseMirrorNode | null = null;
    let foundNode = false;

    editor.state.doc.forEach((childNode) => {
        if (foundNode) {
            return false;
        }

        console.log(previousNode);

        if (childNode === node) {
            console.log("Found node!")
            foundNode = true;
            return false;
        }

        previousNode = childNode;

        return true;
    });

    return previousNode;
}

export { getDeletedNodeIds, getPreviousNode };
