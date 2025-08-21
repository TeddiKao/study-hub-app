import { Navigate, Outlet, useLocation } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

function ProtectedRoute() {
	const isAuthenticated = useIsAuthenticated();
	const location = useLocation();

	if (isAuthenticated === null) {
		return <div>Loading</div>;
	}

	return isAuthenticated ? <Outlet /> : <Navigate state={{ from: location }} replace to={"/login"} />;
}

export default ProtectedRoute;
