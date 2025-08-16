from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Notebook
from authentication.serializers import UserSerializer

from django.db import models

class NotebookSerializer(ModelSerializer):
	def validate(self, data):
		notebook_name = data.get("name")
		request = self.context.get("request")
		notebook_owner = request.user if request else None

		if not notebook_name and self.instance and self.partial:
			notebook_name = self.instance.name

		if notebook_name and notebook_owner:
			owned_notebooks = Notebook.objects.filter(owner=notebook_owner)

			if self.instance:
				owned_notebooks = owned_notebooks.exclude(id=self.instance.id)

			identical_name_notebooks = owned_notebooks.filter(name=notebook_name)
			if identical_name_notebooks.exists():
				raise ValidationError({
					"name": "A notebook with that name already exists"
				})

		return data

	class Meta:
		model = Notebook
		fields = ["id", "name", "description", "notebook_color", "owner"]

		extra_kwargs = {
			"owner": {
				"read_only": True
			}
		}
		depth = 1