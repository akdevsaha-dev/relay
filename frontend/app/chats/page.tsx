"use client";
import { useState } from "react";
import { ChatComponent } from "../components/chatComp";
import { SideBar } from "../components/sideBarComp";
import { AddContacts } from "../components/addContact";
import { ShowContacts } from "../components/showContact";
import { useConversationUiStore } from "../store/conversationUiStore";

export default function page() {
  const [showContactsPopup, setShowContactsPopup] = useState(false);
  const [showAddContactPopup, setShowAddContactPopup] = useState(false);

  const selectedConversationId = useConversationUiStore(
    (state) => state.selectedConversationId
  );
  const handleShowContactPopup = () => {
    setShowContactsPopup(true);
  };
  const handleShowAddContactPopup = () => {
    setShowAddContactPopup(true);
  };
  return (
    <div className="flex relative min-h-screen w-full bg-[#fffefc]">
      {showAddContactPopup && (
        <AddContacts onClose={() => setShowAddContactPopup(false)} />
      )}
      {showContactsPopup && (
        <ShowContacts onClose={() => setShowContactsPopup(false)} />
      )}
      <div className="w-full md:w-[340px] lg:w-[400px]">
        <SideBar
          onPlusClick={handleShowAddContactPopup}
          onMenuContactClick={handleShowContactPopup}
        />
      </div>
      <div className="hidden md:block md:w-[78%]">
        {selectedConversationId ? (
          <ChatComponent conversationId={selectedConversationId} />
        ) : (
          <div className="flex flex-col min-h-screen w-full justify-center items-center">
            <div className="font-bold text-4xl">Relay</div>
            <div className="text-neutral-500 text-xl font-semibold">
              Start a conversation
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
