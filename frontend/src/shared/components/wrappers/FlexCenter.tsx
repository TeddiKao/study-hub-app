import type { ReactNode } from "react";

interface FlexCenterProps {
    children: ReactNode;
}

function FlexCenter({ children }: FlexCenterProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            {children}
        </div>
    )
}

export default FlexCenter;