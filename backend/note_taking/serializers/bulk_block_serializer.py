from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from rest_framework import serializers

from ..models import Block, Note

from .note_serializer import NoteSerializer
from .block_list_serializer import BlockListSerializer

from humps import camelize

class BulkBlockSerializer(ModelSerializer):
    block_id = serializers.IntegerField(required=False, read_only=False)
    temp_block_id = serializers.UUIDField(required=False, read_only=False)
    note = NoteSerializer(read_only=True)
    note_id = PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        write_only=True,
    )
    position = serializers.IntegerField(required=False, read_only=False)
    relative_position = serializers.DictField(required=False, read_only=False)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        temp_id_mapping = self.context.get("temp_id_mapping")
        if temp_id_mapping:
            data["temp_block_id"] = temp_id_mapping.get(data["id"])

        return data


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note_id"].queryset = Note.objects.filter(notebook__owner=request.user)

    class Meta:
        model = Block
        fields = ["id", "block_id", "type", "content", "note", "note_id", "position", "temp_block_id", "additional_attributes", "relative_position"]
        read_only_fields = ["id"]
        list_serializer_class = BlockListSerializer
        extra_kwargs = {
            "position": {
                "required": False
            }
        }
    