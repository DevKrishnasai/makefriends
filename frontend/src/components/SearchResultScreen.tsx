"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useFriends } from "@/customhooks/useFriends";
import { IUser } from "@/lib/types";
import { Context } from "@/providers/globalProvider";
import { disableScrolling, enableScrolling } from "@/lib/scrollFunctions";
import SingleRow from "./SingleRow";
import Loading from "./Loading";
import SingleResultRow from "./SingleResultRow";

const SearchResultScreen = () => {
  const { theme } = useTheme();
  const loading = useFriends();
  const context = useContext(Context);
  const [reqUser, setReqUser] = useState("");
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API}/user/request/${context.user?.id}/${reqUser}`
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (reqUser) {
      sendRequest();
    }
  }, [reqUser]);

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
      {context.searchFriends.length === 0 ? (
        <div className="flex h-full justify-center items-center">
          No Friends Available with {context.search}
        </div>
      ) : (
        context.searchFriends.map((user: IUser) => {
          return (
            <SingleResultRow
              key={user.id}
              user={user}
              reqUser={reqUser}
              setReqUser={setReqUser}
            />
          );
        })
      )}
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default SearchResultScreen;
