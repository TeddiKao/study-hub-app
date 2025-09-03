from typing import Any, Dict

def _snake_to_camel(snake_str: str) -> str:
    if not isinstance(snake_str, str):
        return snake_str
        
    components = snake_str.split('_')
    camel_str = components[0].lower()
    for component in components[1:]:
        camel_str += component.title()

    return camel_str

def camelize_dict_values(data: Dict[str, Any]) -> Dict[str, Any]:
    if not isinstance(data, dict):
        return data
        
    result = {}
    for key, value in data.items():
        if isinstance(value, dict):
            result[_snake_to_camel(key)] = camelize_dict_values(value)
        elif isinstance(value, str):
            result[_snake_to_camel(key)] = _snake_to_camel(value)
        else:
            result[_snake_to_camel(key)] = value

    return result
