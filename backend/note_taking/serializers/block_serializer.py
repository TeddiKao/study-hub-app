from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import Block
from ..models import Note
from .note_serializer import NoteSerializer

class BlockSerializer(ModelSerializer):
    note = NoteSerializer(read_only=True)
    note_id = PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        source="note",
        write_only=True,
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note_id"].queryset = Note.objects.filter(notebook__owner=request.user)

    class Meta:
        model = Block
        fields = ["id", "type", "content", "note", "note_id", "order"]