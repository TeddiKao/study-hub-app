import api from "@/app/api/api";
import { AxiosError } from "axios";
import type { AuthErrorResponse } from "../types/api/authErrors.types";
import type {
    UserSignupPayload,
    UserCreationEndpointResponse,
} from "../types/api/userCreation.types";
import type {
    UserLoginPayload,
    UserLoginEndpointResponse,
} from "../types/api/userLogin.types";

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
                    general: ["An unexpected error occurred"],
                    fields: { email: [], username: [], password: [] },
                },
            };
        }

        if (error.response?.data) {
            return {
                success: false,
                error: {
                    general: error.response.data["detail"]
                        ? [error.response.data["detail"]]
                        : [],
                    fields: { email: [], username: [], password: [] },
                },
            };
        }

        return {
            success: false,
            error: {
                general: ["An unexpected error occurred"],
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
        console.error(error);

        if (!(error instanceof AxiosError)) {
            return {
                success: false,
                error: {
                    general: ["An unexpected error occurred"],
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
                general: ["An unexpected error occurred"],
                fields: { email: [], username: [], password: [] },
            },
        };
    }
}

export { handleUserLogin, handleUserCreation };
