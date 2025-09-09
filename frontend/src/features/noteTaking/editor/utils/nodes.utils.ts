import type { Editor, JSONContent } from "@tiptap/react";
import { Fragment, Node as ProseMirrorNode } from "prosemirror-model";

function getSelectedNode(editor: Editor) {
    const { state } = editor;
    const { $from } = state.selection;

    return $from.parent;
}

function getNodePositionById(editor: Editor, id: string | number) {
    const { doc } = editor.state;

    let position = null;

    doc.descendants((node, pos) => {
        if (node.attrs.id === id) {
            position = pos;
            return false;
        }
    });

    return position;
}

function updateNodeContent(
    editor: Editor,
    node: ProseMirrorNode,
    content: JSONContent[]
) {
    const children = content.map((childJson) =>
        ProseMirrorNode.fromJSON(editor.schema, childJson)
    );

    const fragment = Fragment.fromArray(children);
    const updatedNode = node.type.create(node.attrs, fragment);

    return updatedNode;
}

export { getSelectedNode, getNodePositionById, updateNodeContent };
