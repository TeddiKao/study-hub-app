import type { NoteResponse } from "./notesApi.types";

interface Note extends NoteResponse {}

type Notes = Note[];

export type { Note, Notes }