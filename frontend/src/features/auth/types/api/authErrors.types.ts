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

export type { AuthError, AuthErrorResponse }