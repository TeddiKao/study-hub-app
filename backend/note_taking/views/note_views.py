from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from ..serializers import NoteSerializer

class FetchNotesEndpoint(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        pass