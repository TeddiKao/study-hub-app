import LoadingSpinner from "@/shared/components/general/LoadingSpinner";
import { loadingScreenActionMap } from "../constants/authLoadingScreen.constants";
import type { AuthMethod } from "../types/auth.types";
import BaseModal from "@/shared/components/wrappers/BaseModal";

interface AuthLoadingScreenProps {
	visible: boolean;
	authMethod: AuthMethod;
}

function AuthLoadingScreen({ visible, authMethod }: AuthLoadingScreenProps) {
	return (
		<BaseModal visible={visible} ariaLabelledBy="loading-title">
			<h3 id="loading-title" className="text-xl font-semibold">
				{loadingScreenActionMap[authMethod]}
			</h3>

			<LoadingSpinner className="mt-2" height={32} width={32} />

			<p className="mt-2">Please wait</p>
		</BaseModal>
	);
}

export default AuthLoadingScreen;
