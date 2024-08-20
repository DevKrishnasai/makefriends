"use client";

import { Context } from "@/providers/globalProvider";
import { useContext, useEffect, useState } from "react";

export const useFriends = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const controller = new AbortController();

  //get all friends
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const friendsData = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${
            process.env.NEXT_PUBLIC_API
          }/users/${context.user!.id}`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const data = await friendsData.json();

        // console.log("i am from side bar", data);
        // if (typeof data.users === "object") {
        context.setFriends(data.users);
        // } else {
        // context.setFriends([]);
        // }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (context.user) {
      fetchFriends();
    }
  }, [context.user?.id]);
  return loading;
};
