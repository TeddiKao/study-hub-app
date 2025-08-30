from django.db import models

class Note(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    notebook = models.ForeignKey("note_taking.Notebook", related_name="notes", on_delete=models.CASCADE, null=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["notebook", "name"],
                name="unique_note_per_notebook"
            )
        ]