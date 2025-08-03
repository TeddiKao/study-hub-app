import { useEffect, useState, type ReactNode } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "@/app/api";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
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

			if (response.status === 200) {
				localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);
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

	return isAuthenticated ? children : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
