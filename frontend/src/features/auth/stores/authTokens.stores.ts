import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthTokensStore {
	accessToken: string | null;
	refreshToken: string | null;

	updateAccessToken: (newAccessToken: string) => void;
	updateRefreshToken: (newRefreshToken: string) => void;

	removeAccessToken: () => void;
	removeRefreshToken: () => void;

	clearTokens: () => void;
}

const useAuthTokensStore = create<AuthTokensStore>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,

			updateAccessToken: (newAccessToken: string) =>
				set({ accessToken: newAccessToken }),

			updateRefreshToken: (newRefreshToken: string) =>
				set({ refreshToken: newRefreshToken }),

			removeAccessToken: () => set({ accessToken: null }),

			removeRefreshToken: () => set({ refreshToken: null }),

			clearTokens: () => set({ refreshToken: null, accessToken: null }),
		}),
		{ name: "authTokens", storage: createJSONStorage(() => localStorage) }
	)
);

export { useAuthTokensStore }