import { create } from "zustand";

interface AlertVisibleStore {
    visible: boolean;
    closeAlert: () => void;
    showAlert: () => void;
}

const useSignupErrorAlertVisibleStore = create<AlertVisibleStore>((set) => ({
    visible: false,
    closeAlert: () => set({ visible: false }),
    showAlert: () => set({ visible: true })
}))

const useLoginErrorAlertVisibleStore = create<AlertVisibleStore>((set) => ({
    visible: false,
    closeAlert: () => set({ visible: false }),
    showAlert: () => set({ visible: true })
}))

export { useSignupErrorAlertVisibleStore, useLoginErrorAlertVisibleStore }