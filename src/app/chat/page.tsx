import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <div className="flex h-[calc(100vh-72px)] w-full gap-3 p-2">
      <div className="flex flex-col w-1/3 border-2 rounded-2xl">
        <form className="p-2 z-0">
          <Input type="search" placeholder="search..." />
        </form>
        <SideBar />
      </div>
      <div className="w-full p-2 flex flex-col gap-3">
        <ChatScreen />
      </div>
    </div>
  );
};

export default page;
