from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from ..models import Block, Note

from .note_serializer import NoteSerializer
from .block_list_serializer import BlockListSerializer

class BulkBlockSerializer(ModelSerializer):
    block_id = serializers.IntegerField(required=False, read_only=False)
    note = NoteSerializer(read_only=True)
    note_id = PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        write_only=True,
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note_id"].queryset = Note.objects.filter(notebook__owner=request.user)

    class Meta:
        model = Block
        fields = ["id", "block_id", "type", "content", "note", "note_id", "position"]
        read_only_fields = ["id"]
        list_serializer_class = BlockListSerializer
    