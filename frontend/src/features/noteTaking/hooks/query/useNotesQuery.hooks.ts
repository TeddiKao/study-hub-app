import { isNullOrUndefined } from "@/shared/utils/types.utils";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../utils/notes.services";
import { useNotesStore } from "../../stores/notes/notesStore.stores";

function useNotesQuery() {
    const { currentNotebookId } = useNotesStore();
    
    return useQuery({
		queryKey: !isNullOrUndefined(currentNotebookId)
			? ["notes", currentNotebookId]
			: [],
		queryFn: async () => {
			const fetchNotesResponse = await fetchNotes(currentNotebookId!);
			if (!fetchNotesResponse.success) {
				throw new Error(fetchNotesResponse.error);
			}

			return fetchNotesResponse.notes;
		},

		enabled: !isNullOrUndefined(currentNotebookId),
		staleTime: 2 * 60 * 1000,
	});
}

export default useNotesQuery;