from rest_framework.serializers import ListSerializer
from rest_framework.exceptions import ValidationError

from django.db import transaction
from django.db.models import Max

from core.utils import is_empty_string

from ..models import Block

class BlockListSerializer(ListSerializer):
    def create(self, validated_data):
        blocks = []
        with transaction.atomic():
            temp_id_mapping = {}

            for item in validated_data:
                item["note"] = item.pop("note_id", None)
                temp_block_id = item.pop("temp_block_id", None)

                if not item.get("id"):
                    greatest_position = Block.objects.filter(note=item["note"]).aggregate(max_position=Max("position")).get("max_position")
                    if greatest_position is None:
                        greatest_position = -1
                    
                    item["position"] = greatest_position + 1
                    try:
                        created_block = Block.objects.create(**item)
                        
                        blocks.append(created_block)
                        temp_id_mapping[created_block.id] = temp_block_id
                    except Exception as e:
                        raise ValidationError(f"Failed to create block: {str(e)}")

            self.child.context["temp_id_mapping"] = temp_id_mapping
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

                    if "type" in item:
                        block.type = item.get("type")

                    if "position" in item:
                        block.position = item.get("position")

                    if "content" in item:
                        item_type = item.get("type", block.type)

                        if item_type == "title":
                            item_content = item.get("content", [])
                            if item_content:
                                try:
                                    title_text = item_content[0].get("text")
                                except (IndexError, KeyError, AttributeError):
                                    title_text = None

                                if title_text and not is_empty_string(title_text):
                                    block.content = item_content
                        else:
                            block.content = item.get("content", [])
                    else:
                        block.content = []

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