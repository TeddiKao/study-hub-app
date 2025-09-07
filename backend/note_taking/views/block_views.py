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
        if blocks_data is None:
            raise ValidationError({ "blocks": "This field is required" })

        note_ids = []
        for block_data in blocks_data:
            note_ids.append(block_data["note_id"])

        blocks_queryset = list(Block.objects.filter(note_id__in=note_ids))

        serializer = BulkBlockSerializer(
            instance=blocks_queryset,
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
