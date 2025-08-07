import type { AuthMethod } from "../types/auth.types";

const loadingScreenActionMap: Record<AuthMethod, string> = {
	Login: "Logging in",
	"Sign up": "Signing up",
};

export { loadingScreenActionMap };
