import type { ReactNode } from "react";

interface ErrorAlertProps {
    visible: boolean;
    alertContent: string;
    children: ReactNode;
}

function ErrorAlert({ alertContent, visible, children }: ErrorAlertProps) {
    if (!visible) return null;

    return (
        <div className="">
            {children}
        </div>
    )
}

export default ErrorAlert;