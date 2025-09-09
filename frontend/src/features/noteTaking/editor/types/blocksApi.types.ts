import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Block, TiptapSerializedBlocks } from "./blockSchema.types";
import type { JSONContent } from "@tiptap/react";

interface RawBlockData {
    type: string;
    content: JSONContent[];
    position: number;
    noteId?: number;
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
type BulkDeleteBlocksSuccess = ApiSuccessResponse;

type BulkBlockUpdateRequest = BlockUpdateRequest[];

interface BulkBlockCreateRequest {
    type: RawBlockData["type"];
    content: RawBlockData["content"];
    noteId: RawBlockData["noteId"];
    tempBlockId: string;
}

type BulkBlockDeleteRequest = number[];

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
    BulkBlockDeleteRequest,
    BulkCreateBlocksSuccess,
    BulkDeleteBlocksSuccess,
};