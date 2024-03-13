"use client";
import {
  ISocketContext,
  IUser,
  MessageType,
  friendsTyping,
  typing,
} from "@/lib/types";
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

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typing, setTyping] = useState<typing>({
    senderId: "",
    receiverId: "",
    message: "",
  });
  const [messages, setMessages] = useState<friendsTyping[]>([]);
  const { theme } = useTheme();

  const context = useContext(Context);

  let newSocket: Socket | null = null;
  useEffect(() => {
    console.log("In useEffect socket provider (SOCKET)");

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
        setMessages((prev) => [
          ...prev,
          {
            id: msg.id,
            message: msg.message,
            messageType: msg.messageType,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            messageFromAndBy: msg.messageFromAndBy,
            createdAt: msg.createdAt,
          },
        ]);
        setTyping({
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          message: "",
        });
        context.setMessages((prev) => [...prev, { ...msg }]);
        // const userIndex = context.friends.findIndex(
        //   (friend) => friend.id === msg.senderId
        // );
        // console.log(userIndex);
        // const prevFriends = context.friends.filter(
        //   (friend) => friend.id !== msg.senderId
        // );
        // console.log("me in socket");

        // // if (userIndex !== -1) {
        // const user = {
        //   ...context.friends[userIndex],
        //   message: msg.message,
        //   messageType: msg.messageType,
        //   messageFrom: msg.senderId,
        // };
        // console.log("prevFriends", prevFriends);

        // // context.setFriends([...prevFriends, user]);
        // // context.setSelect(user);
        // console.log(context.friends);
        // // }
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
        console.log("accepted", friend);
        toast.success(`${friend.username} is now friend`);
        context.setFriends((prev) => [...prev, { ...friend }]);
      });

      newSocket.on("rejected", (friend) => {
        console.log("rejected", friend);
        toast.error(`${friend.username} rejected you`);
      });

      // if (context.select && context.select.id && context.message.message) {
      //   if (context.message.message.length > 0) {
      //     newSocket?.emit("typing", {
      //       senderId: context.user!.id,
      //       receiverId: context.select.id,
      //       message: context.message.message,
      //     });
      //   }
      // }
      // newSocket.on("typing", (obj) => {
      //   setTyping(obj);
      // });
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
  }, [context.user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        typing,
        setTyping,
        messages,
        setMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
