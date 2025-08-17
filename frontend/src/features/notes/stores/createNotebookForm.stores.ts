import type { ChangeEvent } from "react";
import { create } from "zustand";

interface CreateNotebookFormStore {
    isFormVisible: boolean,

    name: string,
    description: string,

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    updateName: (newName: string) => void,
    updateDescription: (newDescription: string) => void,

    clearDetails: () => void,

    updateFormVisiblity: (isFormVisible: boolean) => void
}

const useCreateNotebookFormStore = create<CreateNotebookFormStore>((set, get) => ({
    isFormVisible: false,
    name: "",
    description: "",

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
        get().updateName(e.target.value)
    },

    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
        get().updateDescription(e.target.value)
    },

    updateName: (newName: string) => {
        set({ name: newName })
    },

    updateDescription: (newDescription: string) => {
        set({ description: newDescription })
    },

    clearDetails: () => {
        set({ name: "", description: "" })
    },

    updateFormVisiblity: (isFormVisible: boolean) => {
        set({ isFormVisible: isFormVisible })
    }
}))

export { useCreateNotebookFormStore }