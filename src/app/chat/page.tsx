import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import React from "react";

const page = () => {
  return (
    <div className="bg-red-700 flex">
      <SideBar />
      <ChatScreen />
    </div>
  );
};

export default page;
