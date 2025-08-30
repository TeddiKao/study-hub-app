import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Notebook } from "../../notebooks/types/notebookStore.types";

interface RawNoteData {
    name: string;
    description: string;
}

interface NoteResponse extends RawNoteData {
    id: number;
    notebook: Notebook;
}

interface NotePayload extends RawNoteData {
    notebookId: number;
}

interface FetchNotesSuccess extends ApiSuccessResponse {
    notes: NoteResponseList;
}

interface CreateNoteSuccess extends ApiSuccessResponse {
    createdNote: NoteResponse;
}

interface EditNoteSuccess extends ApiSuccessResponse {
    editedNote: NoteResponse;
}

interface RetrieveNoteSuccess extends ApiSuccessResponse {
    retrievedNote: NoteResponse;
}

type NoteResponseList = NoteResponse[];

export type {
    NoteResponse,
    RawNoteData,
    NotePayload,
    FetchNotesSuccess,
    CreateNoteSuccess,
    EditNoteSuccess,
    RetrieveNoteSuccess,
};
