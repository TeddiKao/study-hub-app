import api from "@/app/api/api";
import { BLOCKS_BASE } from "@/app/api/api.constants";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
} from "@/shared/types/api.types";
import { isAxiosError } from "axios";

interface Block {
    id: number;
    blockType: string;
    blockContent: string;
    note: number;
    blockOrder: number;
}

interface RawBlockData {
    blockType: string;
    blockContent: string;
    blockOrder: number;
}

interface FetchBlocksSuccess extends ApiSuccessResponse {
    blocks: Block[];
}

interface CreateBlockSuccess extends ApiSuccessResponse {
    createdBlock: Block;
}

interface RetrieveBlockSuccess extends ApiSuccessResponse {
    block: Block;
}

interface EditBlockSuccess extends ApiSuccessResponse {
    block: Block;
}

interface DeleteBlockSuccess extends ApiSuccessResponse {
    message: string;
}

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
            blockType: blockData.blockType,
            blockContent: blockData.blockContent,
            blockOrder: blockData.blockOrder,
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

async function editBlock(blockId: number, blockData: RawBlockData) {
    try {
        const response = await api.put(
            `${BLOCKS_BASE}/block/${blockId}/edit/`,
            blockData
        );

        return {
            success: true,
            message: "Successfully edited block",
            block: response.data,
        };
    } catch (error) {
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

async function deleteBlock(blockId: number) {
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

export { fetchBlocks, createBlock, retrieveBlock, editBlock, deleteBlock };
