"use client";

import { Context } from "@/providers/globalProvider";
import { useContext, useEffect, useState } from "react";

export const useFriends = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const controller = new AbortController();

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
