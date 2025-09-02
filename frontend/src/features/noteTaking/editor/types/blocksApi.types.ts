import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Block } from "./blockSchema.types";

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

type DeleteBlockSuccess = ApiSuccessResponse;

export type {
    RawBlockData,
    FetchBlocksSuccess,
    CreateBlockSuccess,
    RetrieveBlockSuccess,
    EditBlockSuccess,
    DeleteBlockSuccess,
};