from typing import Hashable, Iterable
from django.core.exceptions import ValidationError

def normalize_ids(ids: Iterable[Hashable]) -> list[int]:
    normalized_ids = []
    seen_ids = set()

    for index, raw in enumerate(ids):
        try:
            id = int(raw)
        except (ValueError, TypeError):
            raise ValidationError({
                "ids": {
                    index: "Must be an integer"
                }
            })

        if id in seen_ids:
            raise ValidationError({
                "ids": {
                    index: "Duplicate ID"
                }
            })

        seen_ids.add(id)
        normalized_ids.append(id)

    return normalized_ids