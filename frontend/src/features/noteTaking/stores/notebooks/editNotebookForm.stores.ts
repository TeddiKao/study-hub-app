import { create } from "zustand";

interface EditNotebookFormStore {
    isFormVisible: boolean,

    name: string,
    description: string,
    activeNotebookId: number | null,

    updateName: (newName: string) => void,
    updateDescription: (newDescription: string) => void,

    clearDetails: () => void,

    updateFormVisibility: (isFormVisible: boolean) => void,

    updateActiveNotebookId: (notebookId: number) => void,
    clearActiveNotebookId: () => void,
}

const useEditNotebookFormStore = create<EditNotebookFormStore>((set) => ({
    isFormVisible: false,
    activeNotebookId: null,
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