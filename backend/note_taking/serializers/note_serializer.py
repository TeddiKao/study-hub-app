from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from rest_framework.exceptions import ValidationError
from ..models import Note, Notebook
from .notebook_serializer import NotebookSerializer

class NoteSerializer(ModelSerializer):
    notebook = NotebookSerializer(read_only=True)
    notebook_id = PrimaryKeyRelatedField(
        queryset=Notebook.objects.none(),
        source="notebook",
    )

    def validate(self, data):
        note_name = data.get("name")
        notebook = data.get("notebook")

        if self.instance and self.partial:
            if note_name is None:
                note_name = self.instance.name
            
            if notebook is None:
                notebook = self.instance.notebook

        if note_name and notebook:
            if isinstance(note_name, str):
                note_name = note_name.strip()

            notes = Note.objects.filter(notebook=notebook)

            if self.instance:
                notes = notes.exclude(id=self.instance.id)

            identical_name_notes = notes.filter(name=note_name)

            if identical_name_notes.exists():
                raise ValidationError({
                    "name": "A note with that name already exists!"
                })
            
        return data
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["notebook_id"].queryset = Notebook.objects.filter(owner=request.user)

    class Meta:
        model = Note
        fields = ["id", "name", "description", "notebook", "notebook_id"]