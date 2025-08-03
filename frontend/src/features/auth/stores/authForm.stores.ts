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

interface AuthErrorsStore {
	general: string[];
	fields: {
		email: string[];
		username: string[];
		password: string[];
	};
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

	updateGeneralErrors: (generalErrors: string[]) =>
		set({ general: generalErrors }),
	updateEmailErrors: (emailErrors: string[]) =>
		set((state) => ({
			...state,
			fields: {
				...state.fields,
				email: emailErrors
			}
		})),

	updateUsernameErrors: (usernameErrors: string[]) =>
		set((state) => ({
			...state,
			fields: {
				...state.fields,
				username: usernameErrors
			}
		})),

	updatePasswordErrors: (passwordErrors: string[]) =>
		set((state) => ({
			...state,
			fields: {
				...state.fields,
				password: passwordErrors
			}
		}))
}));

export { useAuthCredentialsStore, useAuthErrorsStore };
