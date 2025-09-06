const BACKEND_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

const NOTE_TAKING_BASE = "note_taking";
const NOTEBOOKS_BASE = `${NOTE_TAKING_BASE}/notebooks`;
const NOTES_BASE = `${NOTE_TAKING_BASE}/notes`;
const BLOCKS_BASE = `${NOTE_TAKING_BASE}/blocks`;

export {
    BACKEND_BASE,
    NOTE_TAKING_BASE,
    NOTEBOOKS_BASE,
    NOTES_BASE,
    BLOCKS_BASE,
};
