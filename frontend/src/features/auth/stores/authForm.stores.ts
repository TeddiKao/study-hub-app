import { create } from "zustand"

interface AuthCredentialsStore {
    email: string;
    username: string;
    password: string;

    updateEmail: (newEmail: string) => void;
    updateUsername: (newUsername: string) => void;
    updatePassword: (newPassword: string) => void;
}

const useAuthCredentialsStore = create<AuthCredentialsStore>((set) => ({
    email: "",
    username: "",
    password: "",

    updateEmail: (newEmail: string) => set({ email: newEmail }),
    updateUsername: (newUsername: string) => set({ username: newUsername }),
    updatePassword: (newPassword: string) => set({ password: newPassword })
}))

export { useAuthCredentialsStore }