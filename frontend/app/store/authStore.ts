import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

interface authUser {
    id: string,
    email: string,
    username: string,
    avatarUrl: string
    lastSeen?: string
}

type authStore = {
    authUser: authUser | null
    checkAuth: () => void
    signup: (data: { userName: string, email: string, password: string }) => Promise<boolean>
    signin: (data: { email: string, password: string }) => Promise<boolean>
    logout: () => Promise<boolean>
    isSigningIn: boolean,
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingOut: boolean
}

export const useAuthStore = create<authStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isCheckingAuth: false,
    isSigningIn: false,
    isLoggingOut: false,
    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true })
            const res = await axiosInstance.get("/auth/checkAuth")
            set({ authUser: res.data })
        } catch (error) {
            console.log("failed to check auth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data: { userName: string, email: string, password: string }): Promise<boolean> => {
        try {
            set({ isSigningUp: true })
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "something went wrong")
            return false
        } finally {
            set({ isSigningUp: false })
        }
    },
    signin: async (data: { email: string, password: string }): Promise<boolean> => {
        try {
            set({ isSigningIn: true })
            const res = await axiosInstance.post("/auth/signin", data)
            set({ authUser: res.data })
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "something went wrong")
            return false;
        } finally {
            set({ isSigningIn: false })
        }
    },
    logout: async () => {
        try {
            set({ isLoggingOut: true })
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            return true;
        } catch (error) {
            console.log("Cannot log out", error)
            return false;
        } finally {
            set({ isLoggingOut: false })
        }
    }
}))


