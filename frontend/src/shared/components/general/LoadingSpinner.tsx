import { cn } from "@/shared/utils/cn";

interface LoadingSpinnerProps {
	className: string;
	width: number;
	height: number;
}

function LoadingSpinner({ className = "", height, width }: LoadingSpinnerProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width.toString()}
			height={height.toString()}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
            className={cn("animate-spin", className)}
			role="auth-status"
			aria-label="loading"
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
}

export default LoadingSpinner;
