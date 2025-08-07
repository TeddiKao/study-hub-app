import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthTokensStore {
	accessToken: string | null;
	refreshToken: string | null;

	updateAccessToken: (newAccessToken: string, onError?: () => void) => void;
	updateRefreshToken: (newRefreshToken: string, onError?: () => void) => void;

	removeAccessToken: () => void;
	removeRefreshToken: () => void;

	clearTokens: () => void;
}

const useAuthTokensStore = create<AuthTokensStore>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,

			updateAccessToken: (newAccessToken: string, onError) => {
                try {
                    set({ accessToken: newAccessToken })
                } catch (error) {
                    if (onError) {
                        onError();
                    }
                }
            },

			updateRefreshToken: (newRefreshToken: string, onError) => {
                try {
                    set({ refreshToken: newRefreshToken })
                } catch (error) {
                    if (onError) {
                        onError();
                    }
                }
            },

			removeAccessToken: () => set({ accessToken: null }),

			removeRefreshToken: () => set({ refreshToken: null }),

			clearTokens: () => set({ refreshToken: null, accessToken: null }),
		}),
		{ name: "authTokens", storage: createJSONStorage(() => localStorage) }
	)
);

export { useAuthTokensStore }