import { useQuery } from "@tanstack/react-query";
import { fetchNotebooks } from "../../utils/notebooks.services";

function useNotebooksQuery() {
    return useQuery({
        queryKey: ["notebooks"],
        queryFn: async () => {
            const notebooksFetchResponse = await fetchNotebooks();

            if (!notebooksFetchResponse.success) {
                throw new Error(notebooksFetchResponse.error);
            }

            return notebooksFetchResponse.notebooks;
        },

        staleTime: 2 * 1000 * 60,
    });
}

export default useNotebooksQuery;
