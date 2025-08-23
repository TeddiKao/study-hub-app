import { useRef, useEffect } from "react";
import { useAuthTokensStore } from "../stores/authTokens.stores";
import { handleTokenRefresh } from "../utils/authTokens.services";

function useTokenRefreshInterval() {
    const tokenRefreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const { updateAccessToken } = useAuthTokensStore();

	useEffect(() => {
		tokenRefreshIntervalRef.current = setInterval(async () => {
			const tokenRefreshResponse = await handleTokenRefresh();
			if (!tokenRefreshResponse.success) return;

			updateAccessToken(tokenRefreshResponse.access);
		}, 30 * 1000 * 0.8)

		return () => {
			if (!tokenRefreshIntervalRef.current) return;

			clearInterval(tokenRefreshIntervalRef.current);
		}
	}, []);
}

export default useTokenRefreshInterval;