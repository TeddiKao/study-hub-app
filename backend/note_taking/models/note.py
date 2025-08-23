from django.db import models

class Note(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    notebook = models.ForeignKey("note_taking.models.Notebook", on_delete=models.CASCADE)