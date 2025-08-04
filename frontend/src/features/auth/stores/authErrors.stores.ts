import { useAlertVisibleStore } from "@/shared/stores/alerts.stores";

const useSignupAlertVisibleStore = useAlertVisibleStore();
const useLoginAlertVisibleStore = useAlertVisibleStore();

export { useSignupAlertVisibleStore, useLoginAlertVisibleStore }