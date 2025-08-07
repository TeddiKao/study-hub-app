import { useEffect, useState, type ReactNode } from "react";
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
} from "../constants/tokenKeys.constants";
import { jwtDecode } from "jwt-decode";
import api from "@/app/api";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
	children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
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

		const decodedToken = jwtDecode(accessToken);
		const tokenExpiration = decodedToken.exp;

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

	if (isAuthenticated === null) {
		return <div>Loading</div>;
	}

	return isAuthenticated ? <Navigate to="/home" /> : children;
}

export default AuthRoute;