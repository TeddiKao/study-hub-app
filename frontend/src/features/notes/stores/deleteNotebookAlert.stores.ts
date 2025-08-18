import { create } from "zustand";

interface DeleteNotebookAlertStore {
    isAlertVisible: boolean;
    
    showDeleteNotebookAlert: () => void;
    hideDeleteNotebookAlert: () => void;
}

const useDeleteNotebookAlertStore = create<DeleteNotebookAlertStore>((set) => ({
    isAlertVisible: false,

    showDeleteNotebookAlert: () => set({ isAlertVisible: true }),
    hideDeleteNotebookAlert: () => set({ isAlertVisible: false })
}))

export { useDeleteNotebookAlertStore }