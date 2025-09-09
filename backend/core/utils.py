from typing import Hashable, Iterable
from rest_framework.exceptions import ValidationError

def normalize_ids(ids: Iterable[Hashable]) -> list[int]:
    normalized_ids = []
    seen_ids = set()
    errors = []

    for index, raw in enumerate(ids):
        try:
            parsed_id = int(raw)
        except (ValueError, TypeError):
            errors.append({"index": index, "error": "Must be an integer"})
            continue

        if parsed_id in seen_ids:
            errors.append({"index": index, "error": "Duplicate ID"})
            continue

        seen_ids.add(parsed_id)
        normalized_ids.append(parsed_id)

    if errors:
        raise ValidationError({
            "ids": errors
        })

    return normalized_ids

def is_empty_string(text: str) -> bool:
    return normalize_whitespace(text) == ""

def normalize_whitespace(text: str) -> str:
    if not text:
        return ""

    text = text.replace("\xa0", " ")
    text = " ".join(text.split())

    return text