import type { Editor } from "@tiptap/react";
import useBlocksQuery from "../blocks/useBlocksQuery.hooks";
import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useEffect } from "react";
import { getNodePositionById, getNodePositionByIndex } from "../../utils/nodes.utils";

function useEditorAttributeUpdate(editor: Editor) {
    const { data: blocks } = useBlocksQuery();

    useEffect(() => {
        if (!blocks) return;
        if (!editor) return;

        blocks.forEach((block) => {
            const { id, position } = block.attrs ?? {};

            const nodePosition = getNodePositionById(editor, id);
            const nodeType = editor.schema.nodes[block.type];
            if (!nodeType) return;

            if (isNullOrUndefined(nodePosition)) {
                const positionByIndex = getNodePositionByIndex(
                    editor,
                    position
                );
                if (isNullOrUndefined(positionByIndex)) return;

                editor.commands.command(({ tr: transaction }) => {
                    transaction.setNodeMarkup(
                        positionByIndex!,
                        nodeType,
                        block.attrs
                    );
                    return true;
                });

                return;
            }

            editor.commands.command(({ tr: transaction }) => {
                transaction.setNodeMarkup(nodePosition!, nodeType, block.attrs);
                return true;
            });
        });
    }, [blocks, editor]);
}

export default useEditorAttributeUpdate;
