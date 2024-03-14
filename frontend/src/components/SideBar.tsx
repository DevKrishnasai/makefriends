"use client";
import React, { useContext, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useFriends } from "@/customhooks/useFriends";
import { IFriends, IUser } from "@/lib/types";
import { Context } from "@/providers/globalProvider";
import SingleRow from "./SingleRow";
import Loading from "./Loading";
import { ScrollArea } from "./ui/scroll-area";
import { SocketContext } from "@/providers/SocketProvider";

const SideBar = () => {
  const loading = useFriends();
  const context = useContext(Context);
  const socketcontext = useContext(SocketContext);

  //need to modify
  useEffect(() => {
    if (socketcontext?.socket) {
      socketcontext?.socket.on("new_message", (msg) => {
        const userIndex = context.friends.findIndex(
          (friend) => friend.id === msg.senderId
        );
        const prevFriends = context.friends.filter(
          (friend) => friend.id !== msg.senderId
        );
        if (userIndex !== -1) {
          const user = {
            ...context.friends[userIndex],
            message: msg.message,
            messageType: msg.messageType,
            messageFrom: msg.senderId,
          };
          context.setFriends([user, ...prevFriends]);
        }
      });
    }
  }, [context.friends]);

  return !loading ? (
    <ScrollArea>
      <div
        id="sidebar"
        className={cn(
          "mx-2 h-full flex flex-col z-0 overflow-y-auto scroll-smooth divide-slate-950  dark:divide-sky-200"
        )}
      >
        {context.friends.length === 0 ? (
          <div className="flex h-full justify-center items-center ">
            No Friends
          </div>
        ) : (
          context.friends.map((friend: IFriends) => {
            return (
              <SingleRow
                key={friend.id}
                user={friend}
                select={context.select}
                onSelect={context.setSelect}
                lastMsg={friend.message}
              />
            );
          })
        )}
      </div>
    </ScrollArea>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default SideBar;
