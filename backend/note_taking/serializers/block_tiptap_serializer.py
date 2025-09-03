from rest_framework import serializers
from ..models import Block, Note
from .note_serializer import NoteSerializer

class BlockAttributesSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    position = serializers.IntegerField()
    note = NoteSerializer(read_only=True)

class BlockTiptapSerializer(serializers.ModelSerializer):
    note = NoteSerializer(read_only=True)
    note_id = serializers.PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        source="note",
        write_only=True,
    )

    attrs = BlockAttributesSerializer(source="*")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note_id"].queryset = Note.objects.filter(notebook__owner=request.user)

    class Meta:
        model = Block
        fields = ["type", "content", "attrs", "note_id"]