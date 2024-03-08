import { Context } from "@/providers/globalProvider";
import { useContext, useEffect, useState } from "react";

export const useChats = () => {
  const context = useContext(Context);
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("In useEffect for fetching the user chat history (useEffect)");
    const fetchChat = async () => {
      setLoading(true);
      try {
        console.log(
          "Now sending request to backend for chat history (backend)"
        );
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API}/messages/get`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              senderId: context.user?.id,
              receiverId: context.select?.id,
            }),
            cache: "no-store",
          }
        );
        const json = await data.json();
        context.setMessages(json.chats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (context.select) {
      fetchChat();
    }

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [context.select]);
  return loading;
};
