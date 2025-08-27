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
			const fetchNotesReponse = await fetchNotes(currentNotebookId!);
			if (!fetchNotesReponse.success) {
				throw new Error(fetchNotesReponse.error);
			}

			return fetchNotesReponse.notes;
		},

		enabled: !!currentNotebookId,
		staleTime: 2 * 60 * 1000,
	});
}

export default useNotesQuery;