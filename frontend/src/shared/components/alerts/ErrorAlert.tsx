import errorIcon from "../../assets/errorIcon.svg";

interface ErrorAlertProps {
	visible: boolean;
	errorSummary: string;
	errors: string[];
	onClose: () => void;
}

interface ErrorsListProps {
	errors: string[];
	errorSummary: string;
}

interface ErrorItemProps {
	error: string;
	index: number;
}

interface CloseButtonProps {
	onClose: () => void;
}

function ErrorItem({ error, index }: ErrorItemProps) {
	return (
		<li className="text-white" key={`${error}-${index}`}>
			{error}
		</li>
	);
}

function ErrorsList({ errors, errorSummary }: ErrorsListProps) {
	return (
		<div className="flex flex-col ml-2">
			<p className="text-white">{errorSummary}</p>
			<ul className="relative pl-4 text-white before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-white">
				{errors.map((error, index) => (
					<ErrorItem error={error} index={index} />
				))}
			</ul>
		</div>
	);
}

function CloseButton({ onClose }: CloseButtonProps) {
	return (
		<button
			onClick={onClose}
			className="text-white ml-8 pl-2 pr-2 pt-1 pb-1 rounded-md bg-red-300 hover:cursor-pointer hover:bg-red-400"
		>
			Close
		</button>
	);
}

function ErrorAlert({
	errorSummary,
	errors,
	visible,
	onClose,
}: ErrorAlertProps) {
	if (!visible) return null;

	return (
		<div className="flex flex-row items-center fixed bottom-6 right-6 rounded-xl bg-red-500 w-max pl-2 pr-3 pt-3 pb-3">
			<img src={errorIcon} alt="Error icon" />
			<ErrorsList errorSummary={errorSummary} errors={errors} />
			<CloseButton onClose={onClose} />
		</div>
	);
}

export default ErrorAlert;
