import { EllipsisVerticalIcon } from "lucide-react"
import type { ComponentProps } from "react"

type KebabMenuIconProps = ComponentProps<typeof EllipsisVerticalIcon>

function KebabMenuIcon({ size = 16, className = "", ...rest }: KebabMenuIconProps) {
    return (
        <EllipsisVerticalIcon size={size} className={className} {...rest} />
    )
}

export default KebabMenuIcon;