from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import Note, Notebook
from ..serializers import NotebookSerializer

class NoteSerializer(ModelSerializer):
    notebook = NotebookSerializer(read_only=True)
    notebook_id = PrimaryKeyRelatedField(
        queryset=Notebook.objects.all(),
        source="notebook",
    )

    class Meta:
        model = Note
        fields = ["id", "name", "description", "notebook", "notebook_id"]