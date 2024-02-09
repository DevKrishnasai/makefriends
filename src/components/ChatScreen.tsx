"use client";
import React from "react";
import { BiDotsVerticalRounded, BiPhone, BiVideo } from "react-icons/bi";
import { Input } from "./ui/input";
import ChatBubble from "./ChatBubble";
import { disableScrolling, enableScrolling } from "@/lib/scrollFunctions";
import { useTheme } from "next-themes";

const ChatScreen = () => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <>
      <div className="p-2 px-3 flex justify-between items-center dark:border-white w-full bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="font-bold text-lg">Krishna Sai</p>
            <p className="text-xs font-bold">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BiPhone size={23} />
          <BiVideo size={23} />
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="z-0 flex items-center" asChild>
              <Button variant="outline" className="bg-transparent">
                select
                <RiArrowDropDownFill size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Change Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Telugu</DropdownMenuItem>
              <DropdownMenuItem>Hindi</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <BiDotsVerticalRounded size={23} className="font-bold" />
        </div>
      </div>
      <div
        id="chatscreen"
        className={`h-[calc(100vh-190px)]  px-2 overflow-y-auto scroll-smooth z-0 w-full bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100
        ${theme === "light" ? " apply" : " "}`}
        onScroll={() => disableScrolling("#chatscreen")}
        onMouseMove={() => enableScrolling("#chatscreen")}
        // onClick={enableScrolling}
        onMouseLeave={() => enableScrolling("#chatscreen")}
        onWheel={() => enableScrolling("#chatscreen")}
        onTouchMove={() => enableScrolling("#chatscreen")}
        onTouchEnd={() => enableScrolling("#chatscreen")}
        onTouchCancel={() => enableScrolling("#chatscreen")}
      >
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
      </div>
      <div className="w-full flex justify-between items-center border-1 bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100">
        <Input
          placeholder="type a message..."
          type="text"
          className="z-0 bg-transparent "
        />
        {/* <Input type="file" className="z-0 w-6" /> */}
      </div>
    </>
  );
};

export default ChatScreen;
