from rest_framework import serializers
from ..models import Block
from .note_serializer import NoteSerializer

class BlockTipTapSerializer(serializers.ModelSerializer):
    note = NoteSerializer(read_only=True)
    note_id = serializers.PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        source="note",
        write_only=True,
    )

    def to_representation(self, instance):
        pass

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note_id"].queryset = Note.objects.filter(notebook__owner=request.user)

    class Meta:
        model = Block
        fields = ["type", "content", "note", "position"]