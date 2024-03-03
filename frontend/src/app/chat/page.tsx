"use client";
import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userId } = useAuth();
  console.log(userId);
  return (
    <div className="flex h-[calc(100vh-72px)] w-full gap-3 p-2">
      <div className="flex flex-col w-1/3 border rounded-md border-black dark:border-white">
        <form className="p-2 z-0">
          <Input
            type="search"
            placeholder="search..."
            className="bg-transparent"
          />
        </form>
        <SideBar />
      </div>
      <div className="w-full flex flex-col gap-3 ">
        <ChatScreen />
      </div>
    </div>
  );
};

export default page;
