import { create } from "zustand";

interface AlertVisibleStore {
    visible: boolean;
    closeAlert: () => void;
    showAlert: () => void;
}

const useAlertVisibleStore = create<AlertVisibleStore>((set) => ({
    visible: false,
    closeAlert: () => set({ visible: false }),
    showAlert: () => set({ visible: true })
}))

export { useAlertVisibleStore }