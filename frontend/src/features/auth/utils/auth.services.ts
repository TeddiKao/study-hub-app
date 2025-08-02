import api from "@/app/api";

interface UserCreationPayload {
    email: string;
    username: string;
    password: string;
}

interface UserCreationEndpointResponse {
    accessToken: string;
    refreshToken: string;
}

interface ErrorResponse {
    error: unknown;
}

async function handleUserCreation(authCredentials: UserCreationPayload): Promise<UserCreationEndpointResponse | ErrorResponse> {
    try {
        const response = await api.post("auth/create-user/", authCredentials)

        return {
            accessToken: response.data?.access,
            refreshToken: response.data?.refresh,
        }
    } catch (error) {
        return { error }
    }
}

export { handleUserCreation }