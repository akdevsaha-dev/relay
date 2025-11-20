import axios from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export type Message = {
    id: string
    message: string
    senderId: string
    createdAt: Date
    updatedAt: Date
    conversationId: string
}


type messageStore = {
    isGettingMessages: boolean
    messages: Message[]
    getMessages: (conversationId: string) => Promise<Message[] | null>
    isDeletingMessage: boolean
    deleteMessage: (messageId: string) => Promise<boolean>
}

export const useMessageStore = create<messageStore>((set) => ({
    isGettingMessages: false,
    isDeletingMessage: false,
    messages: [],
    getMessages: async (conversationId: string): Promise<Message[] | null> => {

        try {
            set({ isGettingMessages: true });
            const res = await axiosInstance.get(`/message/getMessages/${conversationId}`)
            if (res.data.success) {
                const messages: Message[] = res.data.data.map((m: any) => ({
                    id: m.id,
                    message: m.message,
                    senderId: m.senderId,
                    createdAt: new Date(m.createdAt),
                    updatedAt: new Date(m.updatedAt),
                    conversationId: m.conversationId
                }))

                set({ messages })
                return messages;
            } else {
                toast.error(res.data.error || "Something went wrong");
                return null
            }

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong";
                toast.error(message);
            }
            return null
        } finally {
            set({ isGettingMessages: false });
        }
    },
    deleteMessage: async (messageId: string) => {
        try {
            set({ isDeletingMessage: true });
            const res = await axiosInstance.delete(`/message/deleteMessage/${messageId}`)
            if (res.data.success) {
                toast.success("Message deleted successfully!");
                return true;
            } else {
                toast.error(res.data.error || "Something went wrong");
                return false;
            }

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong";
                toast.error(message);
                return false;
            }
            return false;
        } finally {
            set({ isDeletingMessage: false });
        }
    }
}))


