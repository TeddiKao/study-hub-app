import api from "@/app/api";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import {
	REFRESH_TOKEN_KEY,
	ACCESS_TOKEN_KEY,
} from "../constants/tokenKeys.constants";

function useIsAuthenticated() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		auth().catch(() => {
			setIsAuthenticated(false);
		});
	}, []);

	const handleTokenRefresh = async () => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		if (!refreshToken) {
			return;
		}

		try {
			const response = await api.post("auth/token/refresh/", {
				refresh: refreshToken,
			});

			localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);

			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
		}
	};

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
			await handleTokenRefresh();
		} else {
			setIsAuthenticated(true);
		}
	};

	return isAuthenticated;
}

export default useIsAuthenticated;
