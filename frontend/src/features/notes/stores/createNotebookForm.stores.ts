import type { ChangeEvent } from "react";
import { create } from "zustand";

interface CreateNotebookFormStore {
    name: string,
    description: string,

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const useCreateNotebookFormStore = create<CreateNotebookFormStore>((set) => ({
    name: "",
    description: "",

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
        set({ name: e.target.value })
    },

    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
        set({ description: e.target.value })
    }
}))

export { useCreateNotebookFormStore }