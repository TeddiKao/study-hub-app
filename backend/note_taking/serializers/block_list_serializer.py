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

        for item in validated_data:
            block_id = item.get("block_id")
            if block_id and block_id in block_mapping:
                block = block_mapping[block_id]

                block.type = item["type"]
                block.content = item["content"]
                block.position = item["position"]
                block.note_id = item["note_id"]
                
                block.save()
            elif not block_id:
                Block.objects.create(**item)
        
        return instance