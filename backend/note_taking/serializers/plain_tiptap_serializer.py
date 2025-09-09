from rest_framework.serializers import Serializer
from rest_framework import serializers

from ..models import Note

class PlainTiptapSerializer(Serializer):
    id = serializers.IntegerField()
    type = serializers.CharField()
    content = serializers.ListField()
    position = serializers.IntegerField()
    note = serializers.PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        write_only=True,
    )
    temp_block_id = serializers.UUIDField()

    def to_representation(self, instance):
        serialized_data = {
            "type": instance.get("type"),
            "content": instance.get("content"),
        }

        serialized_data["attrs"] = {
            "id": instance.get("id"),
            "position": instance.get("position"),
            "note": instance.get("note"),
            "temp_block_id": instance.get("temp_block_id")
        }

        return serialized_data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note"].queryset = Note.objects.filter(notebook__owner=request.user)