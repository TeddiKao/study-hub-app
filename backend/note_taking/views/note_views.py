from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied

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

        queryset = Note.objects.filter(notebook=notebook_id, notebook__owner=self.request.user)

        return queryset
    
class CreateNoteEndpoint(CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        notebook = serializer.validated_data["notebook"]
        if notebook.owner.id != self.request.user.id:
            raise PermissionDenied("You do not have permission to create notes in this notebook")
        
        serializer.save()

class EditNoteEndpoint(UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Note.objects.filter(notebook__owner=self.request.user)

        return queryset

class DeleteNoteEndpoint(DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Note.objects.filter(notebook__owner=self.request.user)

        return queryset
    