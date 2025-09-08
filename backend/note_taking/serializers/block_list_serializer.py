from rest_framework.serializers import ListSerializer
from rest_framework.exceptions import ValidationError
from django.db import transaction

from ..models import Block

class BlockListSerializer(ListSerializer):
    def create(self, validated_data):
        blocks = []
        with transaction.atomic():
            for item in validated_data:
                item["note"] = item.pop("note_id", None)
                if not item.get("id"):
                    try:
                        blocks.append(Block.objects.create(**item))
                    except Exception as e:
                        raise ValidationError(f"Failed to create block: {str(e)}")

        return blocks

    def update(self, instance, validated_data):
        with transaction.atomic():
            block_mapping = {}
            for block in instance:
                block_mapping[block.id] = block

            for item in validated_data:
                block_id = item.pop("block_id", None)

                if block_id and block_id in block_mapping:
                    block = block_mapping[block_id]

                    block.type = item.get("type")
                    block.content = item.get("content", [])
                    block.position = item.get("position")

                    note_id = item.get("note_id")
                    if note_id:
                        if hasattr(note_id, "id"):
                            block.note_id = note_id.id
                        else:
                            block.note_id = note_id
                    
                    try:
                        block.save()
                    except Exception as e:
                        raise ValidationError(f"Failed to update block {block_id}: {str(e)}")
                elif not block_id:
                    try:
                        Block.objects.create(**item)
                    except Exception as e:
                        raise ValidationError(f"Failed to create block: {str(e)}")

            return instance