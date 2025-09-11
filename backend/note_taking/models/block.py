from django.db import models

class Block(models.Model):
    type = models.CharField(max_length=50, null=False, blank=False)
    content = models.JSONField(null=False, blank=False, default=list)
    note = models.ForeignKey("note_taking.Note", related_name="blocks", on_delete=models.CASCADE, null=False, blank=False)
    position = models.PositiveIntegerField(null=False, blank=False)
    additional_attributes = models.JSONField(null=True, blank=True, default=dict)

    class Meta:
        ordering = ("note", "position")
        constraints = [
            models.UniqueConstraint(
                fields=("note", "position"),
                name="unique_note_block_position",
            )
        ]
