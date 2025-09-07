from django.db import transaction
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..serializers import BlockSerializer, BlockTiptapSerializer, BulkBlockSerializer
from ..models import Block
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

        serializer.save()

class BulkUpdateBlocksEndpoint(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BeaconJWTAuthentication]
    
    def post(self, request, *args, **kwargs):
        blocks_data = request.data.get("blocks")
        if not isinstance(blocks_data, list):
            raise ValidationError({ "blocks": "This field must be a list" })

        if blocks_data is None:
            raise ValidationError({ "blocks": "This field is required" })

        block_ids = []
        for item in blocks_data:
            try:
                block_ids.append(int(item["id"]))
            except (KeyError, ValueError, TypeError):
                raise ValidationError({
                    "blocks": "All block IDs must be integers"
                })

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
            for id in block_ids:
                try:
                    instances.append(instances_by_id[id])
                except KeyError:
                    raise PermissionDenied(
                        "One or more blocks do not exist, or you may lack access to them"
                    )

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
