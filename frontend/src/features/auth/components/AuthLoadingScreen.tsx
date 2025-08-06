import LoadingSpinner from "@/shared/components/general/LoadingSpinner";
import { loadingScreenActionMap } from "../constants/authLoadingScreen.constants";
import type { AuthMethods } from "../types/auth.types";

interface AuthLoadingScreenProps {
	visible: boolean;
	authMethod: AuthMethods;
}

function AuthLoadingScreen({ visible, authMethod }: AuthLoadingScreenProps) {
	if (!visible) return null;

	return (
		<>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="loading-title"
				className="flex flex-col items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-50 bg-white p-5 rounded-lg"
			>
				<h3 className="text-xl font-semibold">
					{loadingScreenActionMap[authMethod]}
				</h3>

				<LoadingSpinner className="mt-2" height={32} width={32} />

				<p className="mt-2">Please wait</p>
			</div>

			<div className="fixed top-0 bottom-0 left-0 right-0 opacity-95 bg-gray-950 z-40"></div>
		</>
	);
}

export default AuthLoadingScreen;
