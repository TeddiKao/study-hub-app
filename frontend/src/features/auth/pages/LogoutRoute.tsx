import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import { useEffect } from "react";

function LogoutRoute() {
	useEffect(() => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	}, []);

	return <Navigate to="/login" />;
}

export default LogoutRoute;
