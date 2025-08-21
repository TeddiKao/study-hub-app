import { Trash2 } from "lucide-react";
import type { ComponentProps } from "react";

type TrashIconProps = ComponentProps<typeof Trash2>

function TrashIcon({ size = 16, className = "", ...rest }: TrashIconProps) {
    return (
        <Trash2 size={size} className={className} {...rest} />
    )
}

export default TrashIcon;