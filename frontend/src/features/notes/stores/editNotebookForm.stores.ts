import type { ChangeEvent } from "react";
import { create } from "zustand";

interface EditNotebookFormStore {
    isFormVisible: boolean,

    name: string,
    description: string,
    activeNotebookId: number | null,

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    updateName: (newName: string) => void,
    updateDescription: (newDescription: string) => void,

    clearDetails: () => void,

    updateFormVisiblity: (isFormVisible: boolean) => void,

    updateActiveNotebookId: (notebookId: number) => void,
    clearActiveNotebookId: () => void,
}

const useEditNotebookFormStore = create<EditNotebookFormStore>((set) => ({
    isFormVisible: false,
    activeNotebookId: null,
    name: "",
    description: "",

    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => {
        set({ name: e.target.value })
    },

    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
        set({ description: e.target.value })
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

        if (!isFormVisible) {
            set({ activeNotebookId: null })
        }
    },

    updateActiveNotebookId: (notebookId: number) => {
        set({ activeNotebookId: notebookId })
    },

    clearActiveNotebookId: () => {
        set({ activeNotebookId: null })
    }
}))

export { useEditNotebookFormStore }