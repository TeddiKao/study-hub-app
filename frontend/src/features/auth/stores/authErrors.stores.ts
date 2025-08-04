import { createAlertVisibleStore } from "@/shared/stores/alerts.stores";

const useSignupAlertVisibleStore = createAlertVisibleStore();
const useLoginAlertVisibleStore = createAlertVisibleStore();

export { useSignupAlertVisibleStore, useLoginAlertVisibleStore }