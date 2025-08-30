from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.exceptions import ValidationError

from ..models import Notebook, Note

class NotebookSerializer(ModelSerializer):
	owner = SerializerMethodField()
	note_count = SerializerMethodField()

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
	
	def get_owner(self, obj):
		return {
			"id": obj.owner.id,
			"username": obj.owner.username,
			"email": obj.owner.email
		}

	def get_note_count(self, obj):
		return obj.note_count

	class Meta:
		model = Notebook
		fields = ["id", "name", "description", "notebook_color", "owner", "note_count"]

		extra_kwargs = {
			"owner": {
				"read_only": True
			}
		}