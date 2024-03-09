"use client";
import { IUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SocketContext } from "@/providers/SocketProvider";
import { Context } from "@/providers/globalProvider";
import { useTheme } from "next-themes";
import React, { useContext } from "react";
const SingleResultRow = ({
  user,
  reqUser,
  setReqUser,
}: {
  user: IUser;
  reqUser: string;
  setReqUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { theme } = useTheme();
  const context = useContext(SocketContext);
  const globalContext = useContext(Context);
  // const isOnline = context?.onlineUsers.some((id) => id === user.id);

  return (
    <div
      className={cn(
        "flex items-center gap-2 my-2 ease-linear duration-300 p-1 rounded-md",
        theme === "dark"
          ? "hover:bg-white hover:text-black  "
          : "hover:bg-black hover:text-white  "
      )}
      onClick={() => {
        const selected = globalContext.friends.filter(
          (friend) => friend.id === user.id
        );
        if (!selected.length) {
          setReqUser(user.id);
        } else {
          setReqUser("");
          globalContext.setSearch("");
          globalContext.setSelect(selected[0]);
        }
      }}
    >
      <div className={`avatar `}>
        <div className="w-12 rounded-full">
          <img src={`${user.avatar}`} alt={`Avatar of ${user.username}`} />
        </div>
      </div>
      <div className="font-bold w-full ">
        <p className="text-lg">{user.username}</p>
        <p className="text-[10px]">{user.bio}</p>
      </div>
    </div>
  );
};

export default SingleResultRow;
