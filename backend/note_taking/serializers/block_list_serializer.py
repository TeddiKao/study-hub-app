from rest_framework.serializers import ListSerializer

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
            block_id = item.pop("block_id")
            if block_id and block_id in block_mapping:
                block = block_mapping[block_id]

                block.type = item.get("type")
                block.content = item.get("content", [])
                block.position = item.get("position")
                block.note_id = item.get("note_id")
                
                block.save()

                updated_blocks.append(block)
            elif not block_id:
                block = Block.objects.create(**item)

                updated_blocks.append(block)
        
        return updated_blocks