import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

function AuthRoute() {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated === null) {
		return <div>Loading</div>;
	}

	return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
}

export default AuthRoute;
