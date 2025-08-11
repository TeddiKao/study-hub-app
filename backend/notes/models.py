from django.db import models
from django.contrib.auth import get_user_model

class Notebook(models.Model):
    name = models.CharField(max_length=60, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    notebook_color = models.CharField(max_length=7, null=False, blank=False, default="#b3b3b3")
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)