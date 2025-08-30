import { useQuery } from "@tanstack/react-query";
import { retrieveNotebook } from "../../utils/notebooks.services";
import { isNullOrUndefined } from "@/shared/utils/types.utils";

function useNotebookInfoQuery(notebookId: number | undefined) {
    const isQueryEnabled =
        !isNullOrUndefined(notebookId) && !Number.isNaN(notebookId);

    return useQuery({
        queryKey: ["notebookInfo", notebookId],
        queryFn: async () => {
            const fetchNotebookInfoResponse = await retrieveNotebook(
                notebookId!
            );
            if (!fetchNotebookInfoResponse.success) {
                throw new Error(fetchNotebookInfoResponse.error);
            }

            return fetchNotebookInfoResponse.retrievedNotebook;
        },

        staleTime: 2 * 1000 * 60,
        enabled: isQueryEnabled,
    });
}

export default useNotebookInfoQuery;
