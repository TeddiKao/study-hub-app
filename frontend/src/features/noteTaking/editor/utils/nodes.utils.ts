import type { Editor } from "@tiptap/react";

function getSelectedNode(editor: Editor) {
    const { state } = editor;
    const { $from } = state.selection;

    return $from.parent;
}

export { getSelectedNode };
