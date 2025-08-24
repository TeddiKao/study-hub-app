from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from rest_framework.exceptions import ValidationError
from ..models import Note, Notebook
from ..serializers import NotebookSerializer

class NoteSerializer(ModelSerializer):
    notebook = NotebookSerializer(read_only=True)
    notebook_id = PrimaryKeyRelatedField(
        queryset=Notebook.objects.all(),
        source="notebook",
    )

    def validate(self, data):
        note_name = data.get("request")
        notebook_id = data.get("notebook_id")

        if not note_name and self.instance and self.partial:
            note_name = self.instance.name

        if note_name and notebook_id:
            notes = Note.objects.filter(notebook=notebook_id)

            if self.instance:
                notes = notes.exclude(id=self.instance.id)

            identical_name_notes = notes.filter(name=note_name)

            if identical_name_notes.exists():
                raise ValidationError({
                    "name": "A note with that name already exists!"
                })
            
        return data


    class Meta:
        model = Note
        fields = ["id", "name", "description", "notebook", "notebook_id"]