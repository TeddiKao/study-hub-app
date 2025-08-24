from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from ..serializers import NoteSerializer
from ..models import Note

class FetchNotesEndpoint(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        raw = self.request.query_params.get("notebook_id")
        if raw is None:
            raise ValidationError({
                "notebook_id": "This query parameter is required"
            })
        
        try:
            notebook_id = int(raw)
        except (ValueError, TypeError):
            raise ValidationError({ "notebook_id": "Must be an integer" })

        queryset = Note.objects.filter(notebook=notebook_id)

        return queryset