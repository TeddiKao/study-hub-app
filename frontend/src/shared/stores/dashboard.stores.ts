import { create } from "zustand";

interface DashboardNavbarStateStore {
    expanded: boolean;
    expandedItem: string | null

    expandNavbar: (expandedItem: string) => void;
    collapseNavbar: () => void;
}

interface ActiveItemStore {
    activeItemId: number | null,
    updateActiveItem: (itemId: number) => void,
    clearActiveItem: () => void,
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

const useActiveItemStore = create<ActiveItemStore>((set) => ({
    activeItemId: null,

    updateActiveItem: (itemId: number) => {
        set({ activeItemId: itemId })
    },

    clearActiveItem: () => {
        set({ activeItemId: null })
    }
}))

export { useDashboardNavbarState, useActiveItemStore }