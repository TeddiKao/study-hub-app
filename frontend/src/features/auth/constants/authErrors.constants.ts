const authFieldErrorsMap: Record<string, string> = {
	"auth user with this email already exists.":
		"An account with that email already exists",
	"auth user with this username already exists.":
		"An account with this username already exists",
};

const DEFAULT_ERROR_MESSAGE = "An error occurred. Please try again.";

export { authFieldErrorsMap, DEFAULT_ERROR_MESSAGE };
