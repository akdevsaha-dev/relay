import { create } from "zustand"

type connversationUI = {
    selectedConversationId: string | null
    setSelectedConversation: (id: string) => void
}


export const useConversationUiStore = create<connversationUI>((set) => ({
    selectedConversationId: null,
    setSelectedConversation: (id) => {
        set({ selectedConversationId: id })
    }
}))