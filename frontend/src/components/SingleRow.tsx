"use client";
import { IUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Context } from "@/providers/globalProvider";
import { useTheme } from "next-themes";
import React, { useContext } from "react";
const SingleRow = ({
  user,
  select,
  onSelect,
}: {
  user: IUser;
  select: IUser | null;
  onSelect: React.Dispatch<React.SetStateAction<IUser | null>>;
}) => {
  const { theme } = useTheme();
  const context = useContext(Context);
  const isOnline = context?.onlineUsers.some((id) => id === user.id);

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
      onClick={() =>
        select
          ? onSelect((prev) => (prev!.id === user.id ? null : user))
          : onSelect(user)
      }
    >
      <div className={`avatar ${isOnline ? "online" : ""} `}>
        <div className="w-12 rounded-full">
          <img src={`${user.avatar}`} alt={`Avatar of ${user.username}`} />
        </div>
      </div>
      <div className="font-bold w-full ml-2 ">
        <p className="text-lg">{user.username}</p>
        <p className="text-[10px]">hi man!!</p>
      </div>
    </div>
  );
};

export default SingleRow;
