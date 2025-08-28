import { create } from "zustand";
import type { OverlayStore } from "../types/overlayStore.types";

type AlertVisibleStore = {
    visible: OverlayStore["visible"];
    closeAlert: OverlayStore["close"];
    showAlert: OverlayStore["show"];
}

const createAlertVisibleStore = () => create<AlertVisibleStore>((set) => ({
    visible: false,
    closeAlert: () => set({ visible: false }),
    showAlert: () => set({ visible: true })
}))

const createAlertDialogVisibleStore = createAlertVisibleStore
export { createAlertVisibleStore, createAlertDialogVisibleStore }