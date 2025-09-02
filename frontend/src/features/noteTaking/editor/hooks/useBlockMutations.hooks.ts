import { useQueryClient } from "@tanstack/react-query";
import { useBlocksStore } from "../stores/blocks.stores";

function useBlockMutations() {
    const queryClient = useQueryClient();
    const { currentNoteId } = useBlocksStore();

    async function handleBlockCreate() {
        if (!currentNoteId) {
            return;
        }
    }

    async function handleBlockUpdate() {
        if (!currentNoteId) {
            return;
        }
    }

    async function handleBlockDelete() {
        if (!currentNoteId) {
            return;
        }
    }

    return {
        handleBlockCreate,
        handleBlockUpdate,
        handleBlockDelete,
    };
}

export default useBlockMutations;
