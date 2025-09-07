import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Block, TiptapSerializedBlocks } from "./blockSchema.types";
import type { JSONContent } from "@tiptap/react";

interface RawBlockData {
    type: string;
    content: JSONContent[];
    position: number;
}

interface BlockUpdateRequest {
    id: number;
    blockId: number;
    type: string;
    content: JSONContent[];
    position: number;
    noteId: number;
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

interface BulkUpdateBlocksSuccess extends ApiSuccessResponse {
    updatedBlocks: TiptapSerializedBlocks;
}

interface BulkCreateBlocksSuccess extends ApiSuccessResponse {
    createdBlocks: TiptapSerializedBlocks;
}

type DeleteBlockSuccess = ApiSuccessResponse;
type BulkBlockUpdateRequest = BlockUpdateRequest[];
type BulkBlockCreateRequest = RawBlockData[];

export type {
    RawBlockData,
    FetchBlocksSuccess,
    CreateBlockSuccess,
    RetrieveBlockSuccess,
    EditBlockSuccess,
    DeleteBlockSuccess,
    BulkUpdateBlocksSuccess,
    BlockUpdateRequest,
    BulkBlockUpdateRequest,
    BulkBlockCreateRequest,
    BulkCreateBlocksSuccess,
};