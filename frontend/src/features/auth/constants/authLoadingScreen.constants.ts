import type { AuthMethods } from "../types/auth.types"

const loadingScreenActionMap: Record<AuthMethods, string> = {
    "Login": "Logging in",
    "Sign up": "Signing up"
}

export { loadingScreenActionMap }