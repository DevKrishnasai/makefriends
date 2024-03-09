import { SocketContext } from "@/providers/SocketProvider";
import { Context } from "@/providers/globalProvider";
import { useContext, useEffect, useState } from "react";

export const useChats = () => {
  const context = useContext(Context);
  const socketContext = useContext(SocketContext);
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      try {
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
  }, [context.select, context.user, socketContext?.socket]);
  return loading;
};
