import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import { Message } from "./messageStore";


type Conversation = {
    id: string;
    name?: string | null;
    isGroup: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    lastMessage?: Message | null;
    participants: {
        user: {
            id: string;
            userName: string;
            avatarUrl?: string;
        }
    }[];
};
type conversationStore = {

    isCreatingConversation: boolean
    conversations: Conversation[]
    createConversation: (data: { senderId: string, receiverId: string }) => Promise<string | null>
    isGettingConversation: boolean
    getConversations: (userId: string) => Promise<Conversation[] | null>
}


export const useConversationStore = create<conversationStore>((set) => ({
    isCreatingConversation: false,
    isGettingConversation: false,
    conversations: [],
    createConversation: async (data: { senderId: string, receiverId: string }): Promise<string | null> => {
        try {
            set({ isCreatingConversation: true });
            const res = await axiosInstance.post("/conversation/create", data)
            if (res.data.success) {
                toast.success("Conversation Created Successfully");
                return res.data.data;
            } else {
                toast.error(res.data.error || "Something went wrong");
                return null
            }

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong";
                toast.error(message);
                return null;
            }
            return null

        } finally {
            set({ isCreatingConversation: false });
        }
    },
    getConversations: async (userId: string): Promise<Conversation[] | null> => {
        try {
            set({ isGettingConversation: true });
            const res = await axiosInstance.get(`/conversation/getConversations/${userId}`)
            if (res.data.success) {

                const conversations: Conversation[] = res.data.data.map((m: any) => ({
                    id: m.id,
                    name: m.name,
                    isGroup: m.isGroup,
                    updatedAt: new Date(m.updatedAt),
                    createdAt: new Date(m.createdAt),
                    lastMessage: m.lastMessage,
                    participants: m.participants.map((p: any) => ({
                        user: {
                            id: p.user.id,
                            userName: p.user.userName,
                            avatarUrl: p.user.avatarUrl
                        }
                    }))
                }))
                return conversations;
            } else {
                toast.error(res.data.error || "Something went wrong");
                return null
            }

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong";
                toast.error(message);
                return null;
            }
            return null;
        } finally {
            set({ isGettingConversation: false });
        }
    }
}))