from rest_framework.serializers import Serializer
from rest_framework import serializers

class PlainTiptapSerializer(Serializer):
    id = serializers.IntegerField()
    type = serializers.CharField()
    content = serializers.ListField()
    position = serializers.IntegerField()
    note = serializers.PrimaryKeyRelatedField(
        queryset=Note.objects.none(),
        source="note",
        write_only=True,
    )

    def to_representation(self, instance):
        serialized_data = {
            "id": instance.get("id"),
            "content": instance.get("content"),
        }

        serialized_data["attrs"] = {
            "type": instance.get("type"),
            "position": instance.get("position"),
            "note": instance.get("note")
        }

        return serialized_data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")
        if request and hasattr(request, "user"):
            self.fields["note"].queryset = Note.objects.filter(notebook__owner=request.user)