import { create } from "zustand";
import { fetchUserCredentials } from "../utils/userCredentials.services";

interface UserInfoStore {
	username: string;
	email: string;

	syncCredentials: () => void;
}

const useUserInfoStore = create<UserInfoStore>((set) => ({
	username: "",
	email: "",

	syncCredentials: async () => {
		const response = await fetchUserCredentials();
		if (!response.success) {
			return;
		}

		const { email, username } = response;

		set({ email: email, username: username });
	},
}));

export { useUserInfoStore }