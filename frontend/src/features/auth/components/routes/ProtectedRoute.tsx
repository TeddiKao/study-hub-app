import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

function ProtectedRoute() {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated === null) {
		return <div>Loading</div>;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
