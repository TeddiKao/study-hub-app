import { create } from "zustand";

interface AlertVisibleStore {
    visible: boolean;
    closeAlert: () => void;
    showAlert: () => void;
}

interface AlertDialogVisibleStore extends AlertVisibleStore {}

const createAlertVisibleStore = () => create<AlertVisibleStore>((set) => ({
    visible: false,
    closeAlert: () => set({ visible: false }),
    showAlert: () => set({ visible: true })
}))

const createAlertDialogVisibleStore = () => create<AlertDialogVisibleStore>((set) => ({
    visible: false,
    showAlert: () => set({ visible: true }),
    closeAlert: () => set({ visible: false })
}))

export { createAlertVisibleStore, createAlertDialogVisibleStore }