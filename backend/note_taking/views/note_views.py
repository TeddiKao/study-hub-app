from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from ..serializers import NoteSerializer
from ..models import Note

class FetchNotesEndpoint(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        notebook_id = self.request.query_params.get("notebook_id")
        queryset = Note.objects.filter(notebook=notebook_id)

        return queryset