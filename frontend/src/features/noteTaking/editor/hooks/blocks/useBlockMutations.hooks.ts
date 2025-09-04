import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useQueryClient } from "@tanstack/react-query";
import { createBlock, editBlock, deleteBlock } from "../../services/blocks.services";
import { useBlocksStore } from "../../stores/blocks.stores";
import type { RawBlockData } from "../../types/blocksApi.types";
import type { Blocks } from "../../types/blockSchema.types";

function useBlockMutations() {
    const queryClient = useQueryClient();
    const { currentNoteId } = useBlocksStore();

    async function handleBlockCreate(blockData: RawBlockData) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }

        const createBlockResponse = await createBlock(currentNoteId!, blockData);
        if (!createBlockResponse.success) {
            throw new Error(createBlockResponse.error);
        }

        queryClient.setQueryData(["blocks", currentNoteId], (oldBlocks: Blocks) =>
            oldBlocks ? [...oldBlocks, createBlockResponse.createdBlock] : [createBlockResponse.createdBlock]
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", currentNoteId],
        });
    }

    async function handleBlockUpdate(blockId: number, blockData: RawBlockData) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }
        
        const editBlockResponse = await editBlock(currentNoteId!, blockId, blockData);
        if (!editBlockResponse.success) {
            throw new Error(editBlockResponse.error);
        }

        queryClient.setQueryData(["blocks", currentNoteId], (oldBlocks: Blocks) =>
            oldBlocks ? oldBlocks.map((block) => (block.id === blockId ? editBlockResponse.block : block)) : (oldBlocks ?? [])
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", currentNoteId],
        });
    }

    async function handleBlockDelete(blockId: number) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }
        
        const deleteBlockResponse = await deleteBlock(blockId);
        if (!deleteBlockResponse.success) {
            throw new Error(deleteBlockResponse.error);
        }

        queryClient.setQueryData(["blocks", currentNoteId], (oldBlocks: Blocks) =>
            oldBlocks ? oldBlocks.filter((block) => block.id !== blockId) : (oldBlocks ?? [])
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", currentNoteId],
        });
    }

    return {
        handleBlockCreate,
        handleBlockUpdate,
        handleBlockDelete,
    };
}

export default useBlockMutations;
