import type { ReactNode } from "react";
import ReactDOM from "react-dom";

interface BaseModalProps {
	visible: boolean;
	children: ReactNode;
	ariaLabelledBy: string;
}

function BaseModal({ visible, children, ariaLabelledBy }: BaseModalProps) {
    if (!visible) return;

	return ReactDOM.createPortal(
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby={ariaLabelledBy}
			className="flex flex-col items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-50 bg-white p-5 rounded-lg"
		>
			{children}
		</div>,
        document.getElementById("portal") ?? document.body
	);
}

export default BaseModal;
