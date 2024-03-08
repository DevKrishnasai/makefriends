"use client";
import { IUser } from "@/lib/types";
import { Context } from "@/providers/globalProvider";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";

const useInitialFetch = () => {
  const { user: currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const controller = new AbortController();

  useEffect(() => {
    console.log(
      "In useEffect for checking the user is in db or not (useEffect)"
    );
    const fetchUser = async () => {
      setLoading(true);
      try {
        console.log(
          "Now sending the deatils to backend to check user (backend)"
        );
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API}/user`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              id: currentUser?.id,
              username: currentUser?.fullName,
              avatar: currentUser?.hasImage
                ? currentUser?.imageUrl
                : `https://robohash.org/${currentUser?.firstName}`,
              email: currentUser?.emailAddresses[0].emailAddress,
            }),
          }
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchUser();

      context.setUser({
        id: currentUser!.id,
        username: currentUser!.fullName! || currentUser!.firstName!,
        email: currentUser!.emailAddresses[0].emailAddress,
        avatar: currentUser!.hasImage
          ? currentUser!.imageUrl
          : `https://robohash.org/${currentUser?.firstName}`,
      });
    }

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [currentUser]);
  return loading;
};

export default useInitialFetch;
