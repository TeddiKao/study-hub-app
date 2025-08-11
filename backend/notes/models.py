from django.db import models

class Notebook(models.Model):
    name = models.CharField(max_length=60, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)
    notebook_color = models.CharField(max_length=7, null=False, blank=False, default="#b3b3b3")