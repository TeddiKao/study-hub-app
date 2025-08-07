interface AuthTokensStore {
    accessToken: string | null
    refreshToken: string | null

    updateAccessToken: () => void;
    updateRefreshToken: () => void;

    removeAccessToken: () => void;
    removeRefreshToken: () => void;

    clearTokens: () => void;
}