import { create } from 'zustand';

interface CreateNoteFormStore {
    name: string;
    description: string;
    isVisible: boolean;

    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearDetails: () => void;

    updateFormVisibility: (isVisible: boolean) => void;
}

type EditNotebookFormStore = CreateNoteFormStore;

const useCreateNoteFormStore = create<CreateNoteFormStore>((set) => ({
    name: "",
    description: "",
    isVisible: false,

    updateName: (name) => set({ name }),
    updateDescription: (description) => set({ description }),
    clearDetails: () => set({ name: "", description: "" }),

    updateFormVisibility: (isVisible) => set({ isVisible: isVisible }),
}));

const useEditNoteFormStore = create<EditNotebookFormStore>((set) => ({
    name: "",
    description: "",
    isVisible: false,

    updateName: (name) => set({ name }),
    updateDescription: (description) => set({ description }),
    clearDetails: () => set({ name: "", description: "" }),

    updateFormVisibility: (isVisible) => set({ isVisible: isVisible }),
}));

export { useCreateNoteFormStore, useEditNoteFormStore }