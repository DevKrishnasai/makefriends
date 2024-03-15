"use client";
import { IUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SocketContext } from "@/providers/SocketProvider";
import { Context } from "@/providers/globalProvider";
import { useTheme } from "next-themes";
import React, { useContext, useState } from "react";
import { IoNotifications } from "react-icons/io5";
const SingleRow = ({
  user,
  select,
  onSelect,
  lastMsg,
  unSeen,
}: {
  lastMsg: string;
  user: IUser;
  select: IUser | null;
  onSelect: React.Dispatch<React.SetStateAction<IUser | null>>;
  unSeen: number;
}) => {
  const { theme } = useTheme();
  const context = useContext(Context);
  const socketcontext = useContext(SocketContext);
  const isOnline = context?.onlineUsers.some((id) => id === user.id);
  // const [seen, setSeen] = useState(unSeen === 1 ? true : false);

  return (
    <div
      className={cn(
        "flex items-center my-2 ease-linear duration-300 p-1 rounded-md",
        (theme === "dark"
          ? "hover:bg-white hover:text-black  "
          : "hover:bg-black hover:text-white  ") +
          (select?.id === user.id &&
            theme === "dark" &&
            " bg-white text-black ") +
          (select?.id === user.id &&
            theme === "light" &&
            " bg-black text-white  ")
      )}
      onClick={() => {
        // setSeen(false);
        if (select) {
          onSelect((prev) => (prev!.id === user.id ? null : user));
        } else {
          onSelect(user);
          const userIndex = context.friends.findIndex(
            (friend) => friend.id === user.id
          );
          const prevFriends = context.friends.filter(
            (friend) => friend.id !== user.id
          );
          if (userIndex !== -1) {
            const current = {
              ...context.friends[userIndex],
              unSeenMessages: 0,
            };
            context.setFriends((prev) => [current, ...prevFriends]);
          }
        }
        socketcontext?.setTyping({
          message: "",
          receiverId: "",
          senderId: "",
        });
      }}
    >
      <div className={`avatar ${isOnline ? "online" : ""} `}>
        <div className="w-12 rounded-full">
          <img src={`${user.avatar}`} alt={`Avatar of ${user.username}`} />
        </div>
      </div>
      <div className="font-bold w-full ml-2 ">
        <p className="text-lg">{user.username}</p>
        <p className="text-[10px]">{lastMsg}</p>
      </div>

      <span
        className={cn(
          "absolute animate-pulse top-8 right-5 transform translate-x-1/2 -translate-y-1/2 h-2 w-2 flex items-center justify-center text-xs font-bold bg-transparent text-black border-1 border-black rounded-full",
          theme === "light" ? "bg-black text-white " : "bg-white text-black "
        )}
      >
        {unSeen}
      </span>
    </div>
  );
};

export default SingleRow;
