interface OverlayStore {
    visible: boolean;
    close: () => void;
    show: () => void;
}

export type { OverlayStore }