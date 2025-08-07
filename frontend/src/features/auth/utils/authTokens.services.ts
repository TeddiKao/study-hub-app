import api from "@/app/api";
import { REFRESH_TOKEN_KEY } from "../constants/tokenKeys.constants";

interface TokenRefreshEndpointSuccessResponse {
	success: true,
	access: string,
}

interface TokenRefreshEndpointErrorResponse {
	success: false,
	error: string
}

async function handleTokenRefresh(): Promise<TokenRefreshEndpointSuccessResponse | TokenRefreshEndpointErrorResponse> {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
	if (!refreshToken) {
		return {
			success: false,
			error: "Refresh token not found"
		};
	}

	try {
		const response = await api.post("auth/token/refresh/", {
			refresh: refreshToken,
		});

		return {
			success: true,
			access: response.data.access
		}
	} catch (error) {
		console.error(error);

		return {
			success: false,
			error: "Token refresh failed"
		}
	}
}

export { handleTokenRefresh }