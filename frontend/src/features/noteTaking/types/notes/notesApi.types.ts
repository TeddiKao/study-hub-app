import type { ApiSuccessResponse } from "@/shared/types/api.types";
import type { Notebook } from "../notebooks/notebookStore.types";

interface NoteResponse {
	id: number;
	name: string;
	description: string;
	notebook: Notebook;
}

interface RawNoteData {
	name: string;
	description: string;
}

interface NotePayload {
	name: string;
	description: string;
	notebookId: number;
}

interface FetchNotesSuccess extends ApiSuccessResponse {
	notes: NoteResponse[];
}

interface CreateNoteSuccess extends ApiSuccessResponse {
	createdNote: NoteResponse;
}

interface EditNoteSuccess extends ApiSuccessResponse {
	editedNote: NoteResponse;
}

export type {
	NoteResponse,
	RawNoteData,
	NotePayload,
	FetchNotesSuccess,
	CreateNoteSuccess,
	EditNoteSuccess,
};
