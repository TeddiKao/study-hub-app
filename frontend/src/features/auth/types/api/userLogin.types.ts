interface UserLoginPayload {
	email: string;
	password: string;
}

interface UserLoginEndpointResponse {
	success: true;
	accessToken: string;
	refreshToken: string;
}


export type { UserLoginPayload, UserLoginEndpointResponse }