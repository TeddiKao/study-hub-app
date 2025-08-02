import api from "@/app/api";

interface UserCreationPayload {
	email: string;
	username: string;
	password: string;
}

interface UserCreationEndpointResponse {
	success: true;
	accessToken: string;
	refreshToken: string;
}

interface ErrorResponse {
	success: false;
	error: unknown;
}

async function handleUserCreation(
	authCredentials: UserCreationPayload
): Promise<UserCreationEndpointResponse | ErrorResponse> {
	try {
		const response = await api.post("auth/create-user/", authCredentials);

		return {
			success: true,
			accessToken: response.data?.access,
			refreshToken: response.data?.refresh,
		};
	} catch (error) {
		return { success: false, error };
	}
}

export { handleUserCreation };
