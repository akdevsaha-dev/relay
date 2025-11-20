import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import axios from "axios"

type contactStore = {
    isAddingContact: boolean
    isGettingContacts: boolean
    isUpdatingContact: boolean
    updateContact: (data: { id: string, nickName?: string, isBlocked?: string }) => Promise<any>

    isDeletingContacting: boolean
    deleteContact: (id: string) => Promise<boolean>
    getContacts: (ownerId: string) => Promise<any>
    addContact: (data: { ownerId: string, addedUserId: string }) => Promise<boolean>
}

export const useContactStore = create<contactStore>((set) => ({
    isAddingContact: false,
    isGettingContacts: false,
    isDeletingContacting: false,
    isUpdatingContact: false,
    addContact: async (data): Promise<boolean> => {
        try {
            set({ isAddingContact: true })
            const res = await axiosInstance.post("/contact/addContact", data)
            if (res.data.success) {
                toast.success("Contacted added")
                return true
            } else {
                toast.error("Something went wrong")
                return false
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error || "Something sent wrong")
                return false
            } else {
                toast.error("Unexpected error!")
                return false
            }
        } finally {
            set({ isAddingContact: false })
        }
    },
    getContacts: async (ownerId: string) => {
        try {
            set({ isGettingContacts: true })
            const res = await axiosInstance.get(`/contact/contacts/${ownerId}`)
            if (res.data.success) {
                return {
                    contacts: res.data.data,
                    count: res.data.count
                };
            } else {
                toast.error("Something went wrong");
                return null;
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data.error || "Something went wrong"
                toast.error(error)
            } else {
                toast.error("Unexpected error")
            }
        } finally {
            set({ isGettingContacts: false })
        }
    },
    deleteContact: async (id: string) => {
        try {
            set({ isDeletingContacting: true })
            const res = await axiosInstance.delete(`/contact/contacts/${id}`)
            if (res.data.success) {
                toast.success("Contact deleted");
                return true;
            } else {
                toast.error(res.data.error || "Something went wrong");
                return false;
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong"
                toast.error(message)
                return false
            }
            return false;
        } finally {
            set({ isDeletingContacting: false })
        }
    },
    updateContact: async (data) => {
        try {
            set({ isUpdatingContact: true });
            const res = await axiosInstance.patch(`/contact/update/${data.id}`, {
                nickName: data.nickName,
                isBlocked: data.isBlocked
            })
            if (res.data.success) {
                toast.success(res.data.message || "Contact updated");
                return res.data.data;
            }

            toast.error(res.data.error || "Something went wrong");
            return null;

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong";
                toast.error(message);
            }
        } finally {
            set({ isUpdatingContact: false });
        }
    }
}))