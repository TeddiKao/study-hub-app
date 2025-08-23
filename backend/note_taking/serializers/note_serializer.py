from rest_framework.serializers import ModelSerializer
from ..models import Note
from ..serializers import NotebookSerializer

class NoteSerializer(ModelSerializer):
    notebook = NotebookSerializer()

    class Meta:
        model = Note
        fields = ["id", "name", "description", "notebook"]