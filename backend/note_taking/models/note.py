from django.db import models
from note_taking.models import Notebook

class Note(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE)