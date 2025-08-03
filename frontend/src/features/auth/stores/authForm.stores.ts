import { create } from "zustand"

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

const useAuthCredentialsStore = create<AuthCredentialsStore>((set) => ({
    email: "",
    username: "",
    password: "",

    updateEmail: (newEmail: string) => set({ email: newEmail }),
    updateUsername: (newUsername: string) => set({ username: newUsername }),
    updatePassword: (newPassword: string) => set({ password: newPassword }),

    clearPassword: () => set({ password: "" }),
    clearAllFields: () => set({ username: "", email: "", password: "" })
}))

const useAuthErrorsStore = create((set) => {
    
})

export { useAuthCredentialsStore }