import { useRef, useEffect } from "react";
import { useAuthTokensStore } from "../stores/authTokens.stores";
import { handleTokenRefresh } from "../utils/authTokens.services";
import { ACCESS_TOKEN_LIFETIME } from "../constants/tokenLifetimes.constants";

function useTokenRefreshInterval() {
    const tokenRefreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const { updateAccessToken } = useAuthTokensStore();

	useEffect(() => {
		tokenRefreshIntervalRef.current = setInterval(async () => {
			const tokenRefreshResponse = await handleTokenRefresh();
			if (!tokenRefreshResponse.success) return;

			updateAccessToken(tokenRefreshResponse.access);
		}, ACCESS_TOKEN_LIFETIME * 0.8)

		return () => {
			if (!tokenRefreshIntervalRef.current) return;

			clearInterval(tokenRefreshIntervalRef.current);
		}
	}, [updateAccessToken]);
}

export default useTokenRefreshInterval;