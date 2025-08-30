import { useQuery } from "@tanstack/react-query";
import { retrieveNotebook } from "../../utils/notebooks.services";

function useNotebookInfoQuery(notebookId: number | undefined) {
    return useQuery({
        queryKey: ["notebookInfo", notebookId],
        queryFn: async () => {
            const fetchNotebookInfoResponse = await retrieveNotebook(notebookId!);
            if (!fetchNotebookInfoResponse.success) {
                throw new Error(fetchNotebookInfoResponse.error);
            }

            return fetchNotebookInfoResponse.retrievedNotebook;
        },

        staleTime: 2 * 1000 * 60,
        enabled: !!notebookId,
    });
}

export default useNotebookInfoQuery;
