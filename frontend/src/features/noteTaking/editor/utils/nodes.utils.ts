import type { Editor } from "@tiptap/react";

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
    })

    return position;
}

export { getSelectedNode, getNodePositionById };
