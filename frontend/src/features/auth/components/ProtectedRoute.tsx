import { useState, type ReactNode } from "react";
import { ACCESS_TOKEN_KEY } from "../constants";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const auth = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        if (!accessToken) {
            setIsAuthenticated(false);
            return;
        }

        const decodedToken = jwtDecode(accessToken);
        const tokenExpiration = decodedToken.exp

        if (!tokenExpiration) {
            setIsAuthenticated(false);
            return;
        }

        const now = Date.now() / 1000

        const isExpired = tokenExpiration >= now
        if (!isExpired) {

        } else {
            setIsAuthenticated(true);
        }
    }
}

export default ProtectedRoute;