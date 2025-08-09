import { create } from "zustand";

interface DashboardNavbarStateStore {
    expanded: boolean;
    expandedItem: string | null

    expandNavbar: (expandedItem: string) => void;
    collapseNavbar: () => void;
}

const useDashboardNavbarState = create<DashboardNavbarStateStore>((set) => ({
    expanded: false,
    expandedItem: null,

    expandNavbar: (expandedItem: string) => {
        set({ expanded: true, expandedItem})
    },

    collapseNavbar: () => {
        set({ expanded: false, expandedItem: null })
    }
}))

export { useDashboardNavbarState }