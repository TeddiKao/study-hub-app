from rest_framework.serializers import ModelSerializer
from .models import Notebook

class NotebookSerializer(ModelSerializer):
    class Meta:
        model = Notebook
        fields = "__all__"