import { useQueryClient } from "@tanstack/react-query";
import { useBlocksStore } from "../stores/blocks.stores";
import type { RawBlockData } from "../types/blocksApi.types";
import { createBlock } from "../services/blocks.services";
import type { Blocks } from "../types/blockSchema.types";

function useBlockMutations() {
    const queryClient = useQueryClient();
    const { currentNoteId } = useBlocksStore();

    async function handleBlockCreate(blockData: RawBlockData) {
        if (!currentNoteId) {
            return;
        }

        const createBlockResponse = await createBlock(currentNoteId, blockData);
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

    async function handleBlockUpdate() {
        if (!currentNoteId) {
            return;
        }
    }

    async function handleBlockDelete() {
        if (!currentNoteId) {
            return;
        }
    }

    return {
        handleBlockCreate,
        handleBlockUpdate,
        handleBlockDelete,
    };
}

export default useBlockMutations;
