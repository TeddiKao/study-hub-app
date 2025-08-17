import { create } from "zustand";

interface CreateNotebookFormStore {
    isFormVisible: boolean,

    name: string,
    description: string,

    updateName: (newName: string) => void,
    updateDescription: (newDescription: string) => void,

    clearDetails: () => void,

    updateFormVisibility: (isFormVisible: boolean) => void
}

const useCreateNotebookFormStore = create<CreateNotebookFormStore>((set) => ({
    isFormVisible: false,
    name: "",
    description: "",

    updateName: (newName: string) => {
        set({ name: newName })
    },

    updateDescription: (newDescription: string) => {
        set({ description: newDescription })
    },

    clearDetails: () => {
        set({ name: "", description: "" })
    },

    updateFormVisibility: (isFormVisible: boolean) => {
        set({ isFormVisible: isFormVisible })
    }
}))

export { useCreateNotebookFormStore }