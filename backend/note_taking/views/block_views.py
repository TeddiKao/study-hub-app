from django.db import transaction
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers import (
    BlockSerializer,
    BlockTiptapSerializer,
    BulkBlockSerializer,
    PlainTiptapSerializer
)

from ..models import Block

from core.utils import normalize_ids, normalize_whitespace
from authentication.beacon_auth import BeaconJWTAuthentication

class FetchBlocksEndpoint(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BlockTiptapSerializer

    def get_queryset(self):
        raw = self.request.query_params.get("note_id")
        if raw is None:
            raise ValidationError({
                "note_id": "This query parameter is required"
            })
        
        try:
            note_id = int(raw)
        except (ValueError, TypeError):
            raise ValidationError({ "note_id": "Must be an integer" })

        queryset = Block.objects.filter(note=note_id, note__notebook__owner=self.request.user)
        
        return queryset


class CreateBlockEndpoint(CreateAPIView):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        note = serializer.validated_data["note"]
        if note.notebook.owner.id != self.request.user.id:
            raise PermissionDenied("You do not have permission to create blocks in this note")

        serializer.save()

class EditBlockEndpoint(UpdateAPIView):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(note__notebook__owner=self.request.user)

    def perform_update(self, serializer):
        block = serializer.instance
        if block.note.notebook.owner.id != self.request.user.id:
            raise PermissionDenied("You do not have permission to edit blocks in this note")

        if block.type != "title":
            serializer.save()
            return
        
        title_content = serializer.validated_data.get("content")
        if not title_content:
            return Response({ "message": "Title cannot be empty" }, status=status.HTTP_400_BAD_REQUEST)

        if normalize_whitespace(title_content[0]["text"]) == "":
            return Response({ "message": "Title cannot be empty" }, status=status.HTTP_400_BAD_REQUEST)
        
        block.content = title_content

        serializer.save()

class BulkCreateBlocksEndpoint(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        blocks_data = request.data.get("blocks")
        if blocks_data is None:
            raise ValidationError({ "blocks": "This field is required" })

        if not isinstance(blocks_data, list):
            raise ValidationError({ "blocks": "This field must be a list" })

        created_blocks = BulkBlockSerializer(
            data=blocks_data,
            many=True,
            context={"request": request}
        )

        created_blocks.is_valid(raise_exception=True)
        created_blocks.save()

        tiptap_serialized_blocks = PlainTiptapSerializer(
            instance=created_blocks.data,
            many=True,
            context={"request": request}
        ).data

        return Response({
            "message": "Blocks created successfully",
            "created_blocks": tiptap_serialized_blocks
        }, status=status.HTTP_201_CREATED)

class BulkUpdateBlocksEndpoint(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BeaconJWTAuthentication]
    
    def post(self, request, *args, **kwargs):
        blocks_data = request.data.get("blocks")
        if blocks_data is None:
            raise ValidationError({ "blocks": "This field is required" })

        if not isinstance(blocks_data, list):
            raise ValidationError({ "blocks": "This field must be a list" })

        if len(blocks_data) == 0:
            return Response({
                "message": "No blocks to update",
                "updated_blocks": []
            }, status=status.HTTP_200_OK)

        block_ids = []
        seen_block_ids = set()

        for index, item in enumerate(blocks_data):
            try:
                block_id = int(item["id"])
            except (KeyError, TypeError, ValueError) as err:
                raise ValidationError({
                    "blocks": {
                        index: {
                            "id": "Must be an integer"
                        }
                    }
                })

            if block_id in seen_block_ids:
                raise ValidationError({
                    "blocks": {
                        index: {
                            "id": f"Duplicate block ID {block_id}"
                        }
                    }
                })

            seen_block_ids.add(block_id)
            block_ids.append(block_id)

        with transaction.atomic():
            blocks_queryset = list(
                Block.objects.select_for_update().filter(
                    id__in=block_ids,
                    note__notebook__owner=self.request.user
                )
            )

            instances_by_id = {}
            for block in blocks_queryset:
                instances_by_id[block.id] = block

            instances = []
            missing_ids: list[int] = []
            for id in block_ids:
                block = instances_by_id.get(id)
                if block:
                    instances.append(block)
                else:
                    missing_ids.append(id)

            if missing_ids:
                errors = []
                for id in missing_ids:
                    errors.append({"id": id, "error": "not found or forbidden"})

                raise PermissionDenied(detail={"blocks": errors})

            serializer = BulkBlockSerializer(
                instance=instances,
                data=blocks_data,
                many=True,
                context={"request": request}
            )

            serializer.is_valid(raise_exception=True)
            blocks = serializer.save()

        tiptap_serialized_blocks = BlockTiptapSerializer(
            instance=blocks,
            many=True,
            context={"request": request}
        ).data

        return Response({ 
            "message": "Blocks updated successfully", 
            "updated_blocks": tiptap_serialized_blocks 
        }, status=status.HTTP_200_OK)

class BulkDeleteBlocksEndpoint(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        block_ids = request.data.get("block_ids")
        if block_ids is None:
            raise ValidationError({ "block_ids": "This field is required" })

        if not isinstance(block_ids, list):
            raise ValidationError({ "block_ids": "This field must be a list" })

        if len(block_ids) == 0:
            return Response({
                "message": "No blocks to delete"
            }, status=status.HTTP_200_OK)

        try:
            block_ids = normalize_ids(block_ids)
        except ValidationError as err:
            raise ValidationError({ "block_ids": err })

        with transaction.atomic():
            blocks_queryset = Block.objects.select_for_update().filter(
                id__in=block_ids,
                note__notebook__owner=self.request.user
            )

            blocks_queryset.delete()

        return Response({
            "message": "Blocks deleted successfully"
        }, status=status.HTTP_200_OK)

class RetrieveBlockEndpoint(RetrieveAPIView):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(note__notebook__owner=self.request.user)

class DeleteBlockEndpoint(DestroyAPIView):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(note__notebook__owner=self.request.user)
