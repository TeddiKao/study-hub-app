import type { ReactNode } from "react";
import ReactDOM from "react-dom";

interface BaseModalProps {
	visible: boolean;
	children: ReactNode;
	ariaLabelledBy: string;
	includeOverlay?: boolean;
}

function BaseModal({
	visible,
	children,
	ariaLabelledBy,
	includeOverlay = true,
}: BaseModalProps) {
	if (!visible) return null;

	return ReactDOM.createPortal(
		<>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={ariaLabelledBy}
				className="flex flex-col items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-50 bg-white p-5 rounded-lg"
			>
				{children}
			</div>

			{includeOverlay && (
				<div className="fixed top-0 bottom-0 left-0 right-0 opacity-95 bg-gray-950 z-40"></div>
			)}
		</>,
		document.getElementById("portal") ?? document.body
	);
}

export default BaseModal;
