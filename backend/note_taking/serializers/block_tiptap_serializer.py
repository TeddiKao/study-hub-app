from rest_framework import serializers
from ..models import Block, Note
from .note_serializer import NoteSerializer

from humps import camelize
from core.utils import camelize_dict_values

class BlockTiptapSerializer(serializers.ModelSerializer):
    note = NoteSerializer(read_only=True)
    note_id = serializers.PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        source="note",
        write_only=True,
    )

    def to_representation(self, instance):
        note_data = NoteSerializer(instance.note, context=self.context).data

        serialized_data = {
            "type": instance.type,
            "content": instance.content
        }

        serialized_data["attrs"] = {
            "id": instance.id,
            "position": instance.position,
            "note": note_data
        }

        camelized_keys = camelize(serialized_data)
        camelized_data = camelize_dict_values(camelized_keys)

        return camelized_data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note_id"].queryset = Note.objects.filter(notebook__owner=request.user)

    class Meta:
        model = Block
        fields = ["id", "type", "content", "note", "position", "note_id"]