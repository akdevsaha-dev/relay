import { Contact, MessageSquare, UserRoundPlus } from "lucide-react";
import Image from "next/image";

export const SideBar = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="my-4 w-[30%] flex-col">
        <div className="flex h-[90%] flex-col items-center space-y-14 py-6">
          <div className="cursor-pointer rounded-md px-2 py-2 text-gray-600 hover:bg-pink-600 hover:text-white">
            <MessageSquare className="text-inherit" size={30} />
          </div>
          <div className="cursor-pointer rounded-md px-2 py-2 text-gray-600 hover:bg-pink-600 hover:text-white">
            <UserRoundPlus size={30} className="text-inherit" />
          </div>
          <div className="cursor-pointer rounded-md px-2 py-2 text-gray-600 hover:bg-pink-600 hover:text-white">
            <Contact className="text-inherit" size={30} />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Image
            src={"/profile.png"}
            alt="/profile.png"
            height={50}
            width={50}
          />
        </div>
      </div>
      <div className="my-4 max-h-screen w-[70%] rounded-2xl bg-[#c1beb7]"></div>
    </div>
  );
};
