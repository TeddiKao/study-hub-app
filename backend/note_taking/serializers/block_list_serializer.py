from rest_framework.serializers import ListSerializer

from ..models import Block

class BlockListSerializer(ListSerializer):
    def create(self, validated_data):
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
            block_id = item.get("id")
            if block_id and block_id in block_mapping:
                block = block_mapping[block_id]
                
                for attr, value in item.items():
                    setattr(block, attr, value)
                
                block.save()
            elif not block_id:
                Block.objects.create(**item)
        
        return instance