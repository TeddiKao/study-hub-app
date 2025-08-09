import { create } from "zustand";

interface DashboardNavbarStateStore {
    expanded: boolean;
    expandedItem: string | null

    expandNavbar: (expandedItem: string) => void;
    collapseNavbar: () => void;
}

const useDashboardNavbarState = create<DashboardNavbarStateStore>((set) => ({

}))