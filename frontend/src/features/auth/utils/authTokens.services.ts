import api from "@/app/api/api";
import type {
    TokenRefreshEndpointSuccessResponse,
    TokenRefreshEndpointErrorResponse,
} from "../types/api/tokens.types";
import { useAuthTokensStore } from "../stores/authTokens.stores";

async function handleTokenRefresh(): Promise<
    TokenRefreshEndpointSuccessResponse | TokenRefreshEndpointErrorResponse
> {
    const refreshToken = useAuthTokensStore.getState().refreshToken;

    if (!refreshToken) {
        return {
            success: false,
            error: "Refresh token not found",
        };
    }

    try {
        const response = await api.post("auth/token/refresh/", {
            refresh: refreshToken,
        });

        return {
            success: true,
            access: response.data.access,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Token refresh failed",
        };
    }
}

export { handleTokenRefresh };
