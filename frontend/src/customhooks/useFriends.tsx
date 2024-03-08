"use client";

import { Context } from "@/providers/globalProvider";
import { useContext, useEffect, useState } from "react";

export const useFriends = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const controller = new AbortController();

  useEffect(() => {
    console.log("In useEffect for fetching the friends in db (useEffect)");
    const fetchFriends = async () => {
      setLoading(true);
      try {
        console.log(
          "Now sending a request to backend for getting friends (backend)"
        );
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
        console.log("total", data);
        context.setFriends(data.users);
      } catch (error) {
        console.log(error);
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
