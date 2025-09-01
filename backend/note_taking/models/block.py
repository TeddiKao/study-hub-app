from django.db import models

class Block(models.Model):
    block_type = models.CharField(max_length=50, null=False, blank=False)
    block_content = models.JSONField(null=False, blank=False, default=dict)
    note = models.ForeignKey("note_taking.Note", related_name="blocks", on_delete=models.CASCADE, null=False, blank=False)
    block_order = models.PositiveIntegerField(null=False, blank=False)

    class Meta:
        ordering = ("note", "block_order")
        constraints = [
            models.UniqueConstraint(
                fields=("note", "block_order"),
                name="unique_note_block_order",
            )
        ]
