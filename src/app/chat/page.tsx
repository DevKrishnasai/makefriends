"use client";
import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";

import React from "react";

const page = () => {
  return (
    <div id="bg" className="flex h-[calc(100vh-80px)] w-full gap-3 p-2">
      <div className="flex flex-col w-1/3 dark:border-white  h-full  bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100">
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
