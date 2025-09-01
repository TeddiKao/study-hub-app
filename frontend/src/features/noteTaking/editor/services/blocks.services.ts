import api from "@/app/api/api"
import { BLOCKS_BASE } from "@/app/api/api.constants";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/types/api.types";
import { isAxiosError } from "axios";

interface Block {
    id: number;
    block_type: string;
    block_content: string;
    note: number;
    block_order: number;
}

interface FetchBlocksSuccess extends ApiSuccessResponse {
    blocks: Block[];
}

async function fetchBlocks(noteId: number): Promise<FetchBlocksSuccess | ApiErrorResponse> {
    try {
        const response = await api.get(`${BLOCKS_BASE}/note/${noteId}/blocks/`);

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

async function createBlock() {

}

async function retrieveBlock() {

}


async function editBlock() {

}

async function deleteBlock() {

}

export {
    fetchBlocks,
    createBlock,
    retrieveBlock,
    editBlock,
    deleteBlock,
}