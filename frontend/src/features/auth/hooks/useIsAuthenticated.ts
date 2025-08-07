import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import {
	REFRESH_TOKEN_KEY,
	ACCESS_TOKEN_KEY,
} from "../constants/tokenKeys.constants";
import { handleTokenRefresh } from "../utils/authTokens.services";

function useIsAuthenticated() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		auth().catch(() => {
			setIsAuthenticated(false);

			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
		});
	}, []);

	const auth = async () => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

		if (!accessToken) {
			setIsAuthenticated(false);
			return;
		}

		let tokenExpiration;

		try {
			const decodedToken = jwtDecode(accessToken);
			tokenExpiration = decodedToken.exp;
		} catch (error) {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);

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
				localStorage.removeItem(ACCESS_TOKEN_KEY);
				localStorage.removeItem(REFRESH_TOKEN_KEY);

				setIsAuthenticated(false);

				return;
			}

			const { access } = response;
			localStorage.setItem(ACCESS_TOKEN_KEY, access);

			setIsAuthenticated(true);

		} else {
			setIsAuthenticated(true);
		}
	};

	return isAuthenticated;
}

export default useIsAuthenticated;
