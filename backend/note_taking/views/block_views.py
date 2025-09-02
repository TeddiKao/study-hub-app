from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied

from ..serializers import BlockSerializer, BlockTiptapSerializer
from ..models import Block

class FetchBlocksEndpoint(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlockTiptapSerializer

    def get_queryset(self):
        raw = self.request.query_params.get("note_id")
        if raw is None:
            raise ValidationError({
                "note_id": "This query parameter is required"
            })
        
        try:
            note_id = int(raw)
        except (ValueError, TypeError):
            raise ValidationError({ "note_id": "Must be an integer" })

        queryset = Block.objects.filter(note=note_id, note__notebook__owner=self.request.user)
        
        return queryset


class CreateBlockEndpoint(CreateAPIView):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        note = serializer.validated_data["note"]
        if note.notebook.owner.id != self.request.user.id:
            raise PermissionDenied("You do not have permission to create blocks in this note")

        serializer.save()

class EditBlockEndpoint(UpdateAPIView):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(note__notebook__owner=self.request.user)

    def perform_update(self, serializer):
        block = serializer.instance
        if block.note.notebook.owner.id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit blocks in this note")

        serializer.save()

class RetrieveBlockEndpoint(RetrieveAPIView):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(note__notebook__owner=self.request.user)

class DeleteBlockEndpoint(DestroyAPIView):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(note__notebook__owner=self.request.user)
