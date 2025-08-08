import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { handleTokenRefresh } from "../utils/authTokens.services";
import { useAuthTokensStore } from "../stores/authTokens.stores";

function useIsAuthenticated() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);
	const { accessToken, updateAccessToken, clearTokens } =
		useAuthTokensStore();

	useEffect(() => {
		auth().catch(() => {
			setIsAuthenticated(false);
			clearTokens();
		});
	}, []);

	const auth = async () => {
		if (!accessToken) {
			setIsAuthenticated(false);
			return;
		}

		let tokenExpiration;

		try {
			const decodedToken = jwtDecode(accessToken);
			tokenExpiration = decodedToken.exp;
		} catch (error) {
			clearTokens();
			setIsAuthenticated(false);
		}

		if (!tokenExpiration) {
			setIsAuthenticated(false);
			return;
		}

		const now = Date.now() / 1000;

		const isExpired = tokenExpiration < now;

		if (isExpired) {
			const response = await handleTokenRefresh();
			if (!response.success) {
				clearTokens();
				setIsAuthenticated(false);

				return;
			}

			const { access } = response;
			updateAccessToken(access);

			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(true);
		}
	};

	return isAuthenticated;
}

export default useIsAuthenticated;
