import api from "@/app/api";
import { AxiosError } from "axios";

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

interface AuthError {
	general: string[];
	fields: {
		email: string[];
		username: string[];
		password: string[];
	};
}

interface AuthErrorResponse {
	success: false;
	error: AuthError;
}

async function handleUserLogin(
	authCredentials: UserLoginPayload
): Promise<UserLoginEndpointResponse | AuthErrorResponse> {
	try {
		const response = await api.post("auth/token/get/", authCredentials);

		return {
			success: true,
			accessToken: response.data?.access,
			refreshToken: response.data?.refresh,
		};
	} catch (error) {
		console.error(error);

		if (!(error instanceof AxiosError)) {
			return {
				success: false,
				error: {
					general: ["An unexpected error occured"],
					fields: { email: [], username: [], password: [] },
				},
			};
		}

		if (error.response?.data) {
			return {
				success: false,
				error: {
					general: error.response.data["detail"] ? [error.response.data["detail"]] : [],
					fields: { email: [], username: [], password: [] },
				},
			};
		}

		return {
			success: false,
			error: {
				general: ["An unexpected error occured"],
				fields: { email: [], username: [], password: [] },
			},
		};
	}
}

async function handleUserCreation(
	authCredentials: UserSignupPayload
): Promise<UserCreationEndpointResponse | AuthErrorResponse> {
	try {
		await api.post("auth/create-user/", authCredentials);

		return {
			success: true,
		};
	} catch (error) {
		if (!(error instanceof AxiosError)) {
			return {
				success: false,
				error: {
					general: ["An unexpected error occured"],
					fields: { email: [], username: [], password: [] },
				},
			};
		}

		if (error.response?.data) {
			return {
				success: false,
				error: {
					general: error.response?.data["non_field_errors"] ?? [],
					fields: {
						email: error.response?.data["email"] ?? [],
						username: error.response?.data["username"] ?? [],
						password: error.response?.data["password"] ?? [],
					},
				},
			};
		}

		return {
			success: false,
			error: {
				general: ["An unexpected error occured"],
				fields: { email: [], username: [], password: [] },
			},
		};
	}
}

export { handleUserLogin, handleUserCreation };
