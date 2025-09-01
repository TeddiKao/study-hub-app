import { useQuery } from "@tanstack/react-query";
import { fetchBlocks } from "../services/blocks.services";
import { isNullOrUndefined } from "@/shared/utils/types.utils";

function useBlocksQuery(noteId: number) {
    return useQuery({
        queryKey: ["blocks", noteId],
        queryFn: async () => {
            const blocksResponse = await fetchBlocks(noteId);
            if (!blocksResponse.success) {
                throw new Error(blocksResponse.error);
            }

            return blocksResponse.blocks;
        },

        staleTime: 2 * 60 * 1000,
        enabled: !isNullOrUndefined(noteId),
    });
}

export default useBlocksQuery;
