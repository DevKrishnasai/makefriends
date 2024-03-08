"use client";
import React, { useContext } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useFriends } from "@/customhooks/useFriends";
import { IUser } from "@/lib/types";
import { Context } from "@/providers/globalProvider";
import { disableScrolling, enableScrolling } from "@/lib/scrollFunctions";
import SingleRow from "./SingleRow";
import Loading from "./Loading";

const SideBar = () => {
  const { theme } = useTheme();
  const loading = useFriends();
  const context = useContext(Context);

  return !loading ? (
    <div
      id="sidebar"
      className={cn(
        "mx-2 flex flex-col z-0 overflow-y-auto scroll-smooth divide-slate-950  dark:divide-sky-200",
        theme === "light" ? "apply" : " "
      )}
      onScroll={() => disableScrolling("#sidebar")}
      onMouseMove={() => enableScrolling("#sidebar")}
      // onClick={enableScrolling}
      onMouseLeave={() => enableScrolling("#sidebar")}
      onWheel={() => enableScrolling("#sidebar")}
      onTouchMove={() => enableScrolling("#sidebar")}
      onTouchEnd={() => enableScrolling("#sidebar")}
      onTouchCancel={() => enableScrolling("#sidebar")}
    >
      {context.friends.map((friend: IUser) => {
        return (
          <SingleRow
            key={friend.id}
            user={friend}
            select={context.select}
            onSelect={context.setSelect}
          />
        );
      })}
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default SideBar;
