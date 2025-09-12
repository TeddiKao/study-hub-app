import api from "@/app/api/api";
import { BLOCKS_BASE } from "@/app/api/api.constants";
import type { ApiErrorResponse } from "@/shared/types/api.types";
import { isAxiosError } from "axios";
import type {
    BulkBlockCreateRequest,
    BulkBlockDeleteRequest,
    BulkBlockUpdateRequest,
    BulkCreateBlocksSuccess,
    BulkDeleteBlocksSuccess,
    BulkUpdateBlocksSuccess,
    CreateBlockSuccess,
    DeleteBlockSuccess,
    EditBlockSuccess,
    FetchBlocksSuccess,
    RawBlockData,
    RetrieveBlockSuccess,
} from "../types/blocksApi.types";

async function fetchBlocks(
    noteId: number
): Promise<FetchBlocksSuccess | ApiErrorResponse> {
    try {
        const response = await api.get(`${BLOCKS_BASE}/`, {
            params: {
                noteId: noteId,
            },
        });

        return {
            success: true,
            message: "Successfully fetched blocks",
            blocks: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to fetch blocks",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to fetch blocks",
        };
    }
}

async function createBlock(
    noteId: number,
    blockData: RawBlockData
): Promise<CreateBlockSuccess | ApiErrorResponse> {
    try {
        const response = await api.post(`${BLOCKS_BASE}/create/`, {
            type: blockData.type,
            content: blockData.content,
            position: blockData.position,
            noteId: noteId,
        });

        return {
            success: true,
            message: "Successfully created block",
            createdBlock: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to create block",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to create block",
        };
    }
}

async function bulkCreateBlocks(
    blocks: BulkBlockCreateRequest
): Promise<BulkCreateBlocksSuccess | ApiErrorResponse> {
    try {
        const response = await api.post(`${BLOCKS_BASE}/bulk-create/`, {
            blocks: blocks,
        });

        return {
            success: true,
            message: "Successfully created blocks",
            createdBlocks: response.data.createdBlocks,
        };
    } catch (error) {
        console.error(error);

        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to create blocks",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to create blocks",
        };
    }
}

async function retrieveBlock(
    blockId: number
): Promise<RetrieveBlockSuccess | ApiErrorResponse> {
    try {
        const response = await api.get(`${BLOCKS_BASE}/block/${blockId}/`);

        return {
            success: true,
            message: "Successfully retrieved block",
            block: response.data,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to retrieve block",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to retrieve block",
        };
    }
}

async function editBlock(
    noteId: number,
    blockId: number,
    blockData: RawBlockData
): Promise<EditBlockSuccess | ApiErrorResponse> {
    try {
        const response = await api.put(
            `${BLOCKS_BASE}/block/${blockId}/edit/`,
            {
                type: blockData.type,
                content: blockData.content,
                position: blockData.position,
                noteId: noteId,
                ...(blockData.additionalAttributes !== undefined ? {
                    additionalAttributes: blockData.additionalAttributes
                } : {}),
            }
        );

        return {
            success: true,
            message: "Successfully edited block",
            block: response.data,
        };
    } catch (error) {
        console.error(error);

        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to edit block",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to edit block",
        };
    }
}

async function bulkUpdateBlocks(
    blocks: BulkBlockUpdateRequest
): Promise<ApiErrorResponse | BulkUpdateBlocksSuccess> {
    try {
        const response = await api.post(`${BLOCKS_BASE}/bulk-update/`, {
            blocks: blocks,
        });

        return {
            success: true,
            message: response.data.message,
            updatedBlocks: response.data.updatedBlocks,
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to update blocks",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to update blocks",
        };
    }
}

async function deleteBlock(
    blockId: number
): Promise<DeleteBlockSuccess | ApiErrorResponse> {
    try {
        await api.delete(`${BLOCKS_BASE}/block/${blockId}/delete/`);

        return {
            success: true,
            message: "Block deleted successfully",
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to delete block",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to delete block",
        };
    }
}

async function bulkDeleteBlocks(
    blockIds: BulkBlockDeleteRequest
): Promise<BulkDeleteBlocksSuccess | ApiErrorResponse> {
    try {
        await api.delete(`${BLOCKS_BASE}/bulk-delete/`, {
            data: {
                blockIds: blockIds,
            },
        });

        return {
            success: true,
            message: "Blocks deleted successfully",
        };
    } catch (error) {
        if (!isAxiosError(error)) {
            return {
                success: false,
                error: "Failed to delete blocks",
            };
        }

        return {
            success: false,
            error: error.response?.data?.error ?? "Failed to delete blocks",
        };
    }
}

export {
    fetchBlocks,
    createBlock,
    retrieveBlock,
    editBlock,
    deleteBlock,
    bulkUpdateBlocks,
    bulkCreateBlocks,
    bulkDeleteBlocks,
};
