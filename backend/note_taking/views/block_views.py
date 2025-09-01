from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied

from ..serializers import BlockSerializer
from ..models import Block

class FetchBlocksEndpoint(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlockSerializer

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