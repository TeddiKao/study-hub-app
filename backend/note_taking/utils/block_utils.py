from typing import TypedDict

class FullBlockData(TypedDict):
    id: int
    type: str
    content: list
    note: dict
    position: int

def parse_tiptap_serializer_input(block: FullBlockData):
    return {
        "id": block["id"],
        "type": block["type"],
        "content": block["content"],
        "note_id": block["note"]["id"],
        "position": block["position"]
    }

def parse_tiptap_serializer_inputs(blocks: list[FullBlockData]):
    parsed_blocks = []
    for block in blocks:
        parsed_blocks.append(parse_tiptap_serializer_input(block))
    
    return parsed_blocks