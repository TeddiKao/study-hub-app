import api from "@/app/api";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "../constants/tokenKeys.constants";

async function handleTokenRefresh() {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
	if (!refreshToken) {
		return;
	}

	try {
		const response = await api.post("auth/token/refresh/", {
			refresh: refreshToken,
		});

		localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
	} catch (error) {
		console.error(error);

		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	}
}

export { handleTokenRefresh }