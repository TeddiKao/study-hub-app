import { create } from "zustand";
import type { OverlayStore } from "../types/overlayStore.types"

type DialogStore = {
    visible: OverlayStore["visible"];
    closeDialog: OverlayStore["close"];
    showDialog: OverlayStore["show"];
}

const createDialogVisibleStore = () => create<DialogStore>((set) => ({
    visible: false,
    closeDialog: () => set({ visible: false }),
    showDialog: () => set({ visible: true })
}))

export { createDialogVisibleStore }