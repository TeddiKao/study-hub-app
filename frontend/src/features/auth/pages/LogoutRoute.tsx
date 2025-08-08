import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthTokensStore } from "../stores/authTokens.stores";

function LogoutRoute() {
	const { clearTokens } = useAuthTokensStore();
	
	useEffect(() => {
		clearTokens();
	}, []);

	return <Navigate to="/login" />;
}

export default LogoutRoute;
