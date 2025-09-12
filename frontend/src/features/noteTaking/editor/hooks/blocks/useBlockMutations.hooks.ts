import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useQueryClient } from "@tanstack/react-query";
import {
    createBlock,
    editBlock,
    deleteBlock,
    bulkUpdateBlocks,
    bulkCreateBlocks,
    bulkDeleteBlocks,
} from "../../services/blocks.services";
import { useBlocksStore } from "../../stores/blocks.stores";
import type {
    BulkBlockCreateRequest,
    BulkBlockDeleteRequest,
    BulkBlockUpdateRequest,
    RawBlockData,
} from "../../types/blocksApi.types";
import type {
    Blocks,
    TiptapSerializedBlocks,
} from "../../types/blockSchema.types";

function useBlockMutations() {
    const queryClient = useQueryClient();
    const { currentNoteId } = useBlocksStore();

    async function handleBlockCreate(blockData: RawBlockData) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }

        const createBlockResponse = await createBlock(
            currentNoteId!,
            blockData
        );
        if (!createBlockResponse.success) {
            throw new Error(createBlockResponse.error);
        }

        queryClient.setQueryData(
            ["blocks", currentNoteId],
            (oldBlocks: Blocks) =>
                oldBlocks
                    ? [...oldBlocks, createBlockResponse.createdBlock]
                    : [createBlockResponse.createdBlock]
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", currentNoteId],
        });
    }

    async function handleBlockUpdate(blockId: number, blockData: RawBlockData) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }

        const editBlockResponse = await editBlock(
            currentNoteId!,
            blockId,
            blockData
        );
        if (!editBlockResponse.success) {
            throw new Error(editBlockResponse.error);
        }

        queryClient.setQueryData(
            ["blocks", currentNoteId],
            (oldBlocks: Blocks) =>
                oldBlocks
                    ? oldBlocks.map((block) =>
                          block.id === blockId ? editBlockResponse.block : block
                      )
                    : oldBlocks ?? []
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", currentNoteId],
        });
    }

    async function handleBlockBulkCreate(blocks: BulkBlockCreateRequest) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }

        const bulkCreateBlocksResponse = await bulkCreateBlocks(blocks);
        if (!bulkCreateBlocksResponse.success) {
            throw new Error(bulkCreateBlocksResponse.error);
        }

        queryClient.setQueryData(
            ["blocks", currentNoteId],
            (oldBlocks: TiptapSerializedBlocks) =>
                oldBlocks
                    ? [...oldBlocks, ...bulkCreateBlocksResponse.createdBlocks]
                    : bulkCreateBlocksResponse.createdBlocks
        );
    }

    async function handleBlocksBulkUpdate(
        blocks: BulkBlockUpdateRequest,
        noteId?: number
    ) {
        const noteIdUsed = noteId ?? currentNoteId;

        if (isNullOrUndefined(noteIdUsed)) {
            return;
        }

        const bulkUpdateBlocksResponse = await bulkUpdateBlocks(blocks);

        if (!bulkUpdateBlocksResponse.success) {
            throw new Error(bulkUpdateBlocksResponse.error);
        }

        queryClient.setQueryData(
            ["blocks", noteIdUsed],
            (oldBlocks: TiptapSerializedBlocks) => {
                const updatedBlocks = bulkUpdateBlocksResponse.updatedBlocks;
                const updatedIds = updatedBlocks.map((block) => block.attrs.id);

                return oldBlocks
                    ? oldBlocks.map((block) =>
                          updatedIds.includes(block.attrs.id)
                              ? updatedBlocks.find(
                                    (updatedBlockId) =>
                                        updatedBlockId.attrs.id ===
                                        block.attrs.id
                                )
                              : block
                      )
                    : oldBlocks ?? [];
            }
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", noteIdUsed],
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

        queryClient.setQueryData(
            ["blocks", currentNoteId],
            (oldBlocks: Blocks) =>
                oldBlocks
                    ? oldBlocks.filter((block) => block.id !== blockId)
                    : oldBlocks ?? []
        );

        await queryClient.invalidateQueries({
            queryKey: ["blocks", currentNoteId],
        });
    }

    async function handleBlocksBulkDelete(blockIds: BulkBlockDeleteRequest) {
        if (isNullOrUndefined(currentNoteId)) {
            return;
        }

        const deleteBlockResponse = await bulkDeleteBlocks(blockIds);
        if (!deleteBlockResponse.success) {
            throw new Error(deleteBlockResponse.error);
        }

        queryClient.setQueryData(
            ["blocks", currentNoteId],
            (oldBlocks: TiptapSerializedBlocks) => {
                return oldBlocks
                    ? oldBlocks.filter((block) => !blockIds.includes(block.attrs.id))
                    : oldBlocks ?? [];
            }
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
        handleBlockBulkCreate,
        handleBlocksBulkDelete,
    };
}

export default useBlockMutations;
