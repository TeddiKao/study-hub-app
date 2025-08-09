import api from "@/app/api";
import type { ApiErrorResponse } from "@/shared/types/api.types";

interface UserCredentialsEndpointSuccessResponse {
	email: string;
	username: string;
	success: true;
}

async function fetchUserCredentials(): Promise<
	UserCredentialsEndpointSuccessResponse | ApiErrorResponse
> {
	try {
		const response = await api.post("/auth/get-credentials/");

		return {
			email: response.data?.email,
			username: response.data?.username,
			success: true
		};
	} catch (error) {
		return {
			success: false,
            error: "Failed to fetch credentials"
		};
	}
}

export { fetchUserCredentials };
