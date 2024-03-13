"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useFriends } from "@/customhooks/useFriends";
import { IUser } from "@/lib/types";
import { Context } from "@/providers/globalProvider";
import { disableScrolling, enableScrolling } from "@/lib/scrollFunctions";
import Loading from "./Loading";
import SingleResultRow from "./SingleResultRow";
import toast from "react-hot-toast";

const SearchResultScreen = () => {
  const { theme } = useTheme();
  const loading = useFriends();
  const context = useContext(Context);
  const [reqUser, setReqUser] = useState("");

  //send friend request to user
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API}/user/request/${context.user?.id}/${reqUser}`
        );
        const data = await response.json();
        toast.success(data.message, {
          style: {
            background: theme === "dark" ? "#000" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (reqUser) {
      sendRequest();
      setReqUser("");
      context.setSearch("");
      context.setSelect(null);
    }
  }, [reqUser]);

  return !loading ? (
    <div
      id="sidebar"
      className={cn(
        "mx-2 flex h-full flex-col z-0 overflow-y-auto scroll-smooth divide-slate-950  dark:divide-sky-200"
      )}
    >
      {context.searchFriends && context.searchFriends.length === 0 ? (
        <div className="flex h-full justify-center items-center font-bold">
          Nope, No User Found
        </div>
      ) : (
        context.searchFriends &&
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
