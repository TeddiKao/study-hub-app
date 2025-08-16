import { EllipsisVerticalIcon } from "lucide-react"

interface KebabMenuIconProps {
    size?: number
    className?: string
}

function KebabMenuIcon({ size = 16, className = "" }: KebabMenuIconProps) {
    return (
        <EllipsisVerticalIcon size={size} className={className} />
    )
}

export default KebabMenuIcon;