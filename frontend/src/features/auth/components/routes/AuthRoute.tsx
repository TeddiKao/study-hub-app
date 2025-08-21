import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

interface AuthRouteProps {
	children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated === null) {
		return <div>Loading</div>;
	}

	return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
}

export default AuthRoute;
