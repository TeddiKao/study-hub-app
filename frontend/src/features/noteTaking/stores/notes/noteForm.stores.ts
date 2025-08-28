import { create } from 'zustand';

interface NoteFormStore {
    name: string;
    description: string;

    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearDetails: () => void;
}

const useNoteFormStore = create<NoteFormStore>((set) => ({
    name: "",
    description: "",

    updateName: (name) => set({ name }),
    updateDescription: (description) => set({ description }),
    clearDetails: () => set({ name: "", description: "" }),
}));

export { useNoteFormStore }