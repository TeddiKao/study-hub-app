import type { ChangeEvent } from "react";
import { create } from "zustand";

interface CreateNotebookFormStore {
    isFormVisible: boolean,

    name: string,
    description: string,

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,

    clearDetails: () => void,

    updateFormVisiblity: (isFormVisible: boolean) => void
}

const useCreateNotebookFormStore = create<CreateNotebookFormStore>((set) => ({
    isFormVisible: false,
    name: "",
    description: "",

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
        set({ name: e.target.value })
    },

    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
        set({ description: e.target.value })
    },

    clearDetails: () => {
        set({ name: "", description: "" })
    },

    updateFormVisiblity: (isFormVisible: boolean) => {
        set({ isFormVisible: isFormVisible })
    }
}))

export { useCreateNotebookFormStore }