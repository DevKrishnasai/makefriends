"use client";
import { IMessage, ISocketContext, IUser, typing } from "@/lib/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { Context } from "./globalProvider";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import useUserActive from "@/customhooks/useUserActive";

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  //socket holder
  const [socket, setSocket] = useState<Socket | null>(null);
  //for getting realtime typing message
  const [typing, setTyping] = useState<typing>({
    senderId: "",
    receiverId: "",
    message: "",
  });

  const { theme } = useTheme();
  const context = useContext(Context);
  let newSocket: Socket | null = null;

  const loading = useUserActive();
  useEffect(() => {
    if (socket) {
      if (!loading) {
        console.log("disconnecting");
        socket?.emit("offline", context.user?.id);
      } else {
        console.log("reconnecting");
        socket?.emit("online", context.user?.id);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (context.user) {
      newSocket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        query: {
          userId: context.user.id,
        },
      });

      setSocket(newSocket);

      newSocket.on("onlineUsers", (users) => {
        context.setOnlineUsers(users);
      });

      newSocket.on("new_message", (msg) => {
        if (context.select?.id === msg["senderId"]) {
          context.setMessages((prev) => [...prev, { ...msg }]);
          setTyping({
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: "",
          });
          return;
        }
        const userIndex = context.friends.findIndex(
          (friend) => friend.id === msg.senderId
        );
        const prevFriends = context.friends.filter(
          (friend) => friend.id !== msg.senderId
        );

        if (userIndex !== -1) {
          const count = context.friends[userIndex].unSeenMessages || 0;
          // console.log("count-->", count);
          // console.log("@@@@@@@", context.friends[userIndex]);
          const user = {
            ...context.friends[userIndex],
            message: msg.message,
            messageType: msg.messageType,
            messageFrom: msg.senderId,
            unSeenMessages:
              (context.friends[userIndex].unSeenMessages || 0) + 1,
          };
          // console.log("in unseenblock--> ", userIndex);
          // console.log("user unseen-->", user);

          context.setFriends((prev) => [user, ...prevFriends]);
        }
      });

      newSocket.on("friendRequest", (user: IUser[]) => {
        toast.success(`A friend request from ${user[0].username}`, {
          style: {
            background: theme === "dark" ? "#000" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
        });
        if (context.notifications.length === 0) {
          context.setNotifications([{ ...user[0] }]);
        } else {
          context.setNotifications((prev) => [...(prev || {}), { ...user[0] }]);
        }
      });

      newSocket.on("accepted", (friend) => {
        // console.log("accepted", friend);
        toast.success(`${friend.username} is now friend`);
        context.setFriends((prev) => [...prev, { ...friend }]);
      });

      newSocket.on("rejected", (friend) => {
        // console.log("rejected", friend);
        toast.error(`${friend.username} rejected you`);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [context.user, context.select]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        typing,
        setTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
