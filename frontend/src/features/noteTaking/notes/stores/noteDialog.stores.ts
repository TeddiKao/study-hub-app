import { createDialogVisibleStore } from "@/shared/stores/dialogs.stores";

const useCreateNoteDialogStore = createDialogVisibleStore();
const useEditNoteDialogStore = createDialogVisibleStore();

export { useCreateNoteDialogStore, useEditNoteDialogStore };