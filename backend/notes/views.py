from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Notebook
from .serializers import NotebookSerializer

class FetchNotebooksEndpoint(ListAPIView):
    serializer_class = NotebookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter logic not implemented yet, for future purposes
        filter = self.request.query_params.getList("filters")
        queryset = Notebook.objects.filter(owner=self.request.user)

        return queryset

class CreateNotebookEndpoint(CreateAPIView):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)