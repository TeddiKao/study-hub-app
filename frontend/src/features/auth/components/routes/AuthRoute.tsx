import { Navigate, Outlet, useLocation } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated.hooks";

function AuthRoute() {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    if (isAuthenticated === null) {
        return <div>Loading</div>;
    }

    return isAuthenticated ? (
        <Navigate state={{ from: location }} replace to="/home" />
    ) : (
        <Outlet />
    );
}

export default AuthRoute;
