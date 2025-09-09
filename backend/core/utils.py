from typing import Hashable, Iterable
from rest_framework.exceptions import ValidationError

def normalize_ids(ids: Iterable[Hashable]) -> list[int]:
    normalized_ids = []
    seen_ids = set()
    errors = []

    for index, raw in enumerate(ids):
        try:
            id = int(raw)
        except (ValueError, TypeError):
            errors.append({
                f"Index {index}: Must be an integer"
            })

        if id in seen_ids:
            errors.append({
                f"Index {index}: Duplicate ID"
            })

        seen_ids.add(id)
        normalized_ids.append(id)

    if errors:
        raise ValidationError({
            "ids": errors
        })

    return normalized_ids

def normalize_whitespace(text: str) -> str:
    if not text:
        return ""

    text = text.replace("\xa0", " ")
    text = " ".join(text.split())

    return text