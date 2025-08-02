import api from "@/app/api";

interface UserLoginPayload {
	email: string;
	password: string;
}

interface UserSignupPayload {
	email: string;
	username: string;
	password: string;
}

interface UserLoginEndpointResponse {
	success: true;
	accessToken: string;
	refreshToken: string;
}

interface UserCreationEndpointResponse {
	success: true;
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

async function handleUserCreation(
	authCredentials: UserSignupPayload
): Promise<UserCreationEndpointResponse | ErrorResponse> {
	try {
		await api.post("auth/create-user/", authCredentials);

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: "Signup failed",
		};
	}
}

export { handleUserLogin, handleUserCreation };
