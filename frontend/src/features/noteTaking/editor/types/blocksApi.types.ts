import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Block, TiptapSerializedBlocks } from "./blockSchema.types";
import type { JSONContent } from "@tiptap/react";

interface RawBlockData {
    type: string;
    content: JSONContent[];
    position: number;
    noteId?: number;
    additionalAttributes?: Record<string, unknown>;
}

interface BlockUpdateRequest {
    id: number;
    blockId: number;
    type: string;
    content: JSONContent[];
    position: number;
    noteId: number;
    additionalAttributes?: Record<string, unknown>;
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

interface BlockPayload {
    type: RawBlockData["type"];
    content: RawBlockData["content"];
    noteId: RawBlockData["noteId"];
    tempBlockId: string;
}

interface AnchorBlockCreateRequest extends BlockPayload {
    relativePosition: {
        relativeToId: number;
        placement: "before" | "after";
    };
    followingBlocks?: BlockPayload[];
}

type BulkBlockDeleteRequest = number[];
type BulkBlockCreateRequest = (AnchorBlockCreateRequest | BlockPayload)[];

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
    AnchorBlockCreateRequest,
    BulkBlockDeleteRequest,
    BulkCreateBlocksSuccess,
    BulkDeleteBlocksSuccess,
    BulkBlockCreateRequest,
};