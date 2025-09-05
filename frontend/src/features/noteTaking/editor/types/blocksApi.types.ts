import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Block, TiptapSerializedBlocks } from "./blockSchema.types";
import type { JSONContent } from "@tiptap/react";

interface RawBlockData {
    blockType: string;
    blockContent: JSONContent[];
    blockOrder: number;
}

interface FetchBlocksSuccess extends ApiSuccessResponse {
    blocks: TiptapSerializedBlocks;
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
type BulkUpdateBlocksSuccess = ApiSuccessResponse;

export type {
    RawBlockData,
    FetchBlocksSuccess,
    CreateBlockSuccess,
    RetrieveBlockSuccess,
    EditBlockSuccess,
    DeleteBlockSuccess,
    BulkUpdateBlocksSuccess,
};