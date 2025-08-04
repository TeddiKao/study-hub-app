import { create } from "zustand";

interface AlertVisibleStore {
    visible: boolean;
    closeAlert: () => void;
}

const useAlertVisibleStore = create<AlertVisibleStore>((set) => ({
    visible: false,
    closeAlert: () => set({ visible: false })
}))

export { useAlertVisibleStore }