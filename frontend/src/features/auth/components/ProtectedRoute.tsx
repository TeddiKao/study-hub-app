import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

interface ProtectedRouteProps {
	children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated === null) {
		return <div>Loading</div>
	}

	return isAuthenticated ? children : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
