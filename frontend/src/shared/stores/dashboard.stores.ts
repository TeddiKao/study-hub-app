import { create } from "zustand";

interface DashboardNavbarStateStore {
    expanded: boolean;
    expandedItem: string | null

    expandNavbar: (expandedItem: string) => void;
    collapseNavbar: () => void;
}

interface ActiveItemStore {
    activeItemId: number | null,
    canUpdateActiveItemId: boolean,

    updateActiveItem: (itemId: number) => void,
    clearActiveItem: () => void,

    enableActiveItemIdUpdate: () => void,
    disableActiveItemIdUpdate: () => void,
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

const useActiveItemStore = create<ActiveItemStore>((set, get) => ({
    activeItemId: null,
    canUpdateActiveItemId: true,

    updateActiveItem: (itemId: number) => {
        if (get().canUpdateActiveItemId) {
            set({ activeItemId: itemId })
        }
    },

    clearActiveItem: () => {
        if (get().canUpdateActiveItemId) {
            set({ activeItemId: null })
        }
    },

    enableActiveItemIdUpdate: () => {
        set({ canUpdateActiveItemId: true })
    },

    disableActiveItemIdUpdate: () => {
        set({ canUpdateActiveItemId: false })
    }
}))

export { useDashboardNavbarState, useActiveItemStore }