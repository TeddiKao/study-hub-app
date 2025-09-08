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
            const position = getNodePositionById(editor, block.attrs.id);
            const nodeType = editor.schema.nodes[block.type];
            if (!nodeType) return;

            if (isNullOrUndefined(position)) {
                const positionByIndex = getNodePositionByIndex(
                    editor,
                    block.attrs.position
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
                transaction.setNodeMarkup(position!, nodeType, block.attrs);
                return true;
            });
        });
    }, [blocks, editor]);
}

export default useEditorAttributeUpdate;
