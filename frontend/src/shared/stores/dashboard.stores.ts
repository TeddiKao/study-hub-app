import { create } from "zustand";

interface DashboardNavbarStateStore {
    expanded: boolean;
    expandedItem: string | null

    expandNavbar: (expandedItem: string) => void;
    collapseNavbar: () => void;
}

interface ActiveItemStore {
    activeItemId: number | null,
    activeItemName: string | null,
    activeItemType: string | null,

    canUpdateActiveItemId: boolean,

    updateActiveItem: (itemId: number) => void,
    updateActiveItemName: (itemName: string) => void,
    updateActiveItemType: (itemType: string) => void,

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
    activeItemName: null,
    activeItemType: null,

    canUpdateActiveItemId: true,

    updateActiveItem: (itemId: number) => {
        if (get().canUpdateActiveItemId) {
            set({ activeItemId: itemId })
        }
    },

    updateActiveItemName: (itemName: string) => {
        if (get().canUpdateActiveItemId) {
            set({ activeItemName: itemName })
        }
    },

    updateActiveItemType: (itemType: string) => {
        if (get().canUpdateActiveItemId) {
            set({ activeItemType: itemType })
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
    },
}))

export { useDashboardNavbarState, useActiveItemStore }