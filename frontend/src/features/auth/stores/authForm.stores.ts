import { create } from "zustand"

const useAuthCredentialsStore = create((set) => ({
    email: "",
    username: "",
    password: "",

    updateEmail: (newEmail: string) => set({ email: newEmail }),
    updateUsername: (newUsername: string) => set({ username: newUsername }),
    updatePassword: (newPassword: string) => set({ password: newPassword })
}))

export { useAuthCredentialsStore }