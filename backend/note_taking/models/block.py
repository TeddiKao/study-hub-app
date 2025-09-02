from django.db import models

class Block(models.Model):
    type = models.CharField(max_length=50, null=False, blank=False)
    content = models.JSONField(null=False, blank=False, default=dict)
    note = models.ForeignKey("note_taking.Note", related_name="blocks", on_delete=models.CASCADE, null=False, blank=False)
    order = models.PositiveIntegerField(null=False, blank=False)

    class Meta:
        ordering = ("note", "order")
        constraints = [
            models.UniqueConstraint(
                fields=("note", "order"),
                name="unique_note_block_order",
            )
        ]
