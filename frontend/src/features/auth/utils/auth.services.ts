import api from "@/app/api";

interface UserLoginPayload {
	email: string;
	password: string;
}

interface UserLoginEndpointResponse {
	success: true;
	accessToken: string;
	refreshToken: string;
}

interface ErrorResponse {
	success: false;
	error: string;
}

async function handleUserLogin(
	authCredentials: UserLoginPayload
): Promise<UserLoginEndpointResponse | ErrorResponse> {
	try {
		const response = await api.post("auth/token/get/", authCredentials);

		return {
			success: true,
			accessToken: response.data?.access,
			refreshToken: response.data?.refresh,
		};
	} catch (error) {
		return { success: false, error: "Login failed" };
	}
}

export { handleUserLogin };
