import type { AuthMethods } from "../types/auth.types"

const loadingScreenActionMap: Record<AuthMethods, any> = {
    "Login": "Logging in",
    "Sign up": "Signing up"
}

export { loadingScreenActionMap }