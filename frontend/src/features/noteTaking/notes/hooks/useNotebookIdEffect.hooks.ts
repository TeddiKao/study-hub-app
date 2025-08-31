import { useEffect } from "react";

interface UseNotebookIdEffectProps {
    notebookId: string | undefined;
    updateCurrentNotebookId: (id: number) => void;
    clearCurrentNotebookId: () => void;
}

function useNotebookIdEffect({
    notebookId,
    updateCurrentNotebookId,
    clearCurrentNotebookId,
}: UseNotebookIdEffectProps) {
    useEffect(() => {
        if (notebookId === undefined) {
            return;
        }

        const id = Number(notebookId);
        if (Number.isNaN(id)) {
            clearCurrentNotebookId();
            return;
        }

        if (!Number.isFinite(id)) {
            clearCurrentNotebookId();
            return;
        }

        updateCurrentNotebookId(id);

        return () => {
            clearCurrentNotebookId();
        };
    }, [notebookId, updateCurrentNotebookId, clearCurrentNotebookId]);
}

export default useNotebookIdEffect;
