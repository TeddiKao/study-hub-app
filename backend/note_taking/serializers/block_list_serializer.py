from rest_framework.serializers import ListSerializer
from rest_framework.exceptions import ValidationError

from ..models import Block

class BlockListSerializer(ListSerializer):
    def create(self, validated_data):
        print("Creating")
        blocks = []
        for item in validated_data:
            if not item.get("id"):
                blocks.append(Block.objects.create(**item))

        return blocks

    def update(self, instance, validated_data):
        block_mapping = {}
        for block in instance:
            block_mapping[block.id] = block

        updated_blocks = []
        for item in validated_data:
            block_id = item.pop("block_id", None)

            if block_id and block_id in block_mapping:
                block = block_mapping[block_id]

                block.type = item.get("type")
                block.content = item.get("content", [])
                block.position = item.get("position")
                block.note_id = item.get("note_id").id
                
                try:
                    block.save()
                except Exception as e:
                    raise ValidationError(f"Failed to update block {block_id}: {str(e)}")

                updated_blocks.append(block)
            elif not block_id:
                try:
                    block = Block.objects.create(**item)
                except Exception as e:
                    raise ValidationError(f"Failed to create block: {str(e)}")

                updated_blocks.append(block)
        
        return updated_blocks