import type { ChangeEvent } from "react";
import { create } from "zustand";

interface EditNotebookFormStore {
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

const useEditNotebookFormStore = create<EditNotebookFormStore>((set) => ({
    isFormVisible: false,
    name: "",
    description: "",

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
        set({ name: e.target.value })
    },

    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
        set({ description: e.target.value })
    },

    updateName: (newName: string) => {

    },

    updateDescription: (newDescription: string) => {

    },

    clearDetails: () => {
        set({ name: "", description: "" })
    },

    updateFormVisiblity: (isFormVisible: boolean) => {
        set({ isFormVisible: isFormVisible })
    }
}))

export { useEditNotebookFormStore }