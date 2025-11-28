import { User, X, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useContactStore } from "../store/contactStore";
import { useConversationUiStore } from "../store/conversationUiStore";

export const ShowContacts = ({ onClose }: { onClose: () => void }) => {
  const isGettingContacts = useContactStore((state) => state.isGettingContacts);
  const contacts = useContactStore((state) => state.contacts);
  const getContacts = useContactStore((state) => state.getContacts);
  const setSelectedConversation = useConversationUiStore(
    (state) => state.setSelectedConversation
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleOnClick = (addedUserId: string) => {
    setSelectedConversation(addedUserId);
  };
  return (
    <div
      className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={dropdownRef}
        className="relative w-[90%] md:w-[50%] h-[70%] bg-white rounded-xl shadow-lg p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="flex gap-4 items-center">
          <User className="text-neutral-600" />
          <div className="font-bold text-xl">Contacts</div>
        </div>

        <div className="text-neutral-500 mt-2">Your Contacts</div>

        {isGettingContacts && (
          <div className="w-full h-[250px] flex items-center justify-center">
            <Loader2 className="animate-spin text-neutral-600" size={32} />
          </div>
        )}

        {!isGettingContacts && contacts.length > 0 && (
          <div className="mt-6 flex flex-col gap-4 ">
            {contacts.map((c) => (
              <div
                onClick={() => {
                  handleOnClick(c.addedUser.id);
                  onClose();
                }}
                key={c.id}
                className="flex items-center gap-4 bg-neutral-100 hover:bg-neutral-200 p-4 rounded-lg transition"
              >
                <img
                  src={c.addedUser.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <div className="font-semibold text-lg">
                    {c.addedUser.userName}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {c.addedUser.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isGettingContacts && contacts.length === 0 && (
          <div className="w-full h-[250px] flex items-center justify-center text-neutral-500">
            No contacts found.
          </div>
        )}
      </div>
    </div>
  );
};
