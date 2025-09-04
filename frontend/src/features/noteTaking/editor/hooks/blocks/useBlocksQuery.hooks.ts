import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useQuery } from "@tanstack/react-query";
import { fetchBlocks } from "../../services/blocks.services";
import { useBlocksStore } from "../../stores/blocks.stores";

function useBlocksQuery() {
    const { currentNoteId } = useBlocksStore();

    const isQueryEnabled =
        !isNullOrUndefined(currentNoteId) &&
        !Number.isNaN(currentNoteId) &&
        Number.isFinite(currentNoteId);

    return useQuery({
        queryKey: ["blocks", currentNoteId],
        queryFn: async () => {
            const blocksResponse = await fetchBlocks(currentNoteId!);
            if (!blocksResponse.success) {
                throw new Error(blocksResponse.error);
            }

            return blocksResponse.blocks;
        },

        staleTime: 2 * 60 * 1000,
        enabled: isQueryEnabled,
    });
}

export default useBlocksQuery;
