import { create } from "zustand";

interface AuthCredentialsStore {
	email: string;
	username: string;
	password: string;

	updateEmail: (newEmail: string) => void;
	updateUsername: (newUsername: string) => void;
	updatePassword: (newPassword: string) => void;

	clearPassword: () => void;
	clearAllFields: () => void;
}

interface AuthErrors {
	general: string[];
	fields: {
		email: string[];
		username: string[];
		password: string[];
	};
}

interface AuthErrorsStore extends AuthErrors {
	updateErrors: (errors: AuthErrors) => void;
}

interface AuthStatusStore {
	isLoading: boolean;

	startLoading: () => void;
	stopLoading: () => void;
}

const useAuthCredentialsStore = create<AuthCredentialsStore>((set) => ({
	email: "",
	username: "",
	password: "",

	updateEmail: (newEmail: string) => set({ email: newEmail }),
	updateUsername: (newUsername: string) => set({ username: newUsername }),
	updatePassword: (newPassword: string) => set({ password: newPassword }),

	clearPassword: () => set({ password: "" }),
	clearAllFields: () => set({ username: "", email: "", password: "" }),
}));

const useAuthErrorsStore = create<AuthErrorsStore>((set) => ({
	general: [],
	fields: {
		email: [],
		username: [],
		password: [],
	},

	updateErrors: (errors: AuthErrors) => set(errors)
}));

const useAuthStatusStore = create<AuthStatusStore>((set) => ({
	isLoading: false,
	
	startLoading: () => set({ isLoading: true }),
	stopLoading: () => set({ isLoading: false })
}))

export { useAuthCredentialsStore, useAuthErrorsStore, useAuthStatusStore };
