"use client";
import { ISocketContext } from "@/lib/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { Context } from "./globalProvider";

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const context = useContext(Context);

  useEffect(() => {
    console.log("In useEffect socket provider (SOCKET)");
    let newSocket: Socket | null = null;

    if (context.user) {
      newSocket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        query: {
          userId: context.user.id,
        },
      });
      setSocket(newSocket);

      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("new_message", (msg) => {
        context.setMessages((prev) => [...prev, { ...msg }]);
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
  }, [context.user]);

  return (
    <SocketContext.Provider
      value={{ socket, setOnlineUsers, onlineUsers, setSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
