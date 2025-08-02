import { create } from "zustand"

const useLoginCredentialsStore = create((set) => ({
    email: "",
    password: "",
    updateEmail: (newEmail: string) => set({ email: newEmail }),
    updatePassword: (newPassword: string) => set({ password: newPassword })
}))

export { useLoginCredentialsStore }