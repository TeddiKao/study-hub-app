from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Notebook

class NotebookSerializer(ModelSerializer):
	def validate(self, data):
		notebook_name = data.get("name")
		notebook_owner = data.get("owner")

		if notebook_name and notebook_owner:
			owned_notebooks = Notebook.objects.filter(owner=notebook_owner)
			
			if self.instance:
				owned_notebooks = owned_notebooks.exclude(id=self.instance.id)

			identical_name_notebooks = owned_notebooks.filter(name=notebook_name)

			if identical_name_notebooks.exists():
				raise ValidationError({
					"name": "A notebook with this name already exists"
				})

		return data

	class Meta:
		model = Notebook
		fields = "__all__"