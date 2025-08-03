import errorIcon from "../../assets/errorIcon.svg";

interface ErrorAlertProps {
	visible: boolean;
	alertContent: string;
}

function ErrorAlert({ alertContent, visible }: ErrorAlertProps) {
	if (!visible) return null;

	return (
		<div className="flex flex-row items-center fixed bottom-6 right-6 rounded-xl bg-red-500 w-max pl-2 pr-3 pt-3 pb-3">
			<img src={errorIcon} alt="Error icon" />
			<p className="text-white ml-1">{alertContent}</p>
			<button className="text-white ml-8 pl-2 pr-2 pt-1 pb-1 rounded-md bg-red-300 hover:cursor-pointer hover:bg-red-400">
				Close
			</button>
		</div>
	);
}

export default ErrorAlert;
