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
			<div className="flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
				<h3 className="text-xl font-semibold">
					{loadingScreenActionMap[authMethod]}
				</h3>
			</div>
		</>
	);
}

export default AuthLoadingScreen;
