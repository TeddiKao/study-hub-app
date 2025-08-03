import errorIcon from "../../assets/errorIcon.svg";

interface ErrorAlertProps {
	visible: boolean;
	alertContent: string;
}

function ErrorAlert({ alertContent, visible }: ErrorAlertProps) {
	if (!visible) return null;

	return (
		<div className="flex flex-row fixed bottom-2 right-2 rounded-md bg-red-500">
			<img src={errorIcon} alt="Error icon" />
            <p className="text-white ml-1">{alertContent}</p>
		</div>
	);
}

export default ErrorAlert;
