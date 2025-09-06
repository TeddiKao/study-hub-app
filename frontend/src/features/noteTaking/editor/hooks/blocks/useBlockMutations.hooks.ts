import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useQueryClient } from "@tanstack/react-query";
import { createBlock, editBlock, deleteBlock, bulkUpdateBlocks } from "../../services/blocks.services";
import { useBlocksStore } from "../../stores/blocks.stores";
import type { BulkBlockUpdateRequest, RawBlockData } from "../../types/blocksApi.types";
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

    async function handleBlocksBulkUpdate(blocks: BulkBlockUpdateRequest, noteId?: number) {
        if (isNullOrUndefined(noteId ?? currentNoteId)) {
            return;
        }

        const bulkUpdateBlocksResponse = await bulkUpdateBlocks(blocks);
        
        if (!bulkUpdateBlocksResponse.success) {
            throw new Error(bulkUpdateBlocksResponse.error);
        }

        queryClient.setQueryData(["blocks", noteId ?? currentNoteId], (oldBlocks: Blocks) =>
            oldBlocks ? blocks : (oldBlocks ?? [])
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", noteId ?? currentNoteId],
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
        handleBlocksBulkUpdate,
        handleBlockDelete,
    };
}

export default useBlockMutations;
