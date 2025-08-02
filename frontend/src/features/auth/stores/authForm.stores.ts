import { create } from "zustand"

const useLoginCredentialsStore = create((set) => ({
    email: "",
    password: "",
    updateEmail: (newEmail: string) => set({ email: newEmail }),
    updatePassword: (newPassword: string) => set({ password: newPassword })
}))

const useSignupCredentialsStore = create((set) => ({
    email: "",
    username: "",
    password: "",

    updateEmail: (newEmail: string) => set({ email: newEmail }),
    updateUsername: (newUsername: string) => set({ username: newUsername }),
    updatePassword: (newPassword: string) => set({ password: newPassword })
}))

export { useLoginCredentialsStore, useSignupCredentialsStore }