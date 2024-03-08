"use client";
import { IContext, IMessage, IUser, MessageType } from "@/lib/types";
import React, { ReactNode, createContext, useState } from "react";

export const Context = createContext<IContext>({
  user: null,
  setUser: () => {},
  select: null,
  setSelect: () => {},
  message: {
    id: "",
    messageType: "text",
    message: "",
    receiverId: "",
    senderId: "",
  },
  setMessage: () => {},
  typeOfMessage: "text",
  setTypeOfMessage: () => {},
  messages: [],
  setMessages: () => {},
  friends: [],
  setFriends: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [select, setSelect] = useState<IUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [message, setMessage] = useState<IMessage>({
    id: "",
    messageType: "text",
    message: "",
    receiverId: "",
    senderId: "",
  });
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [friends, setFriends] = useState<IUser[]>([]);
  const [typeOfMessage, setTypeOfMessage] = useState<MessageType>("text");

  return (
    <Context.Provider
      value={{
        select,
        setSelect,
        message,
        setMessage,
        user,
        setUser,
        typeOfMessage,
        setTypeOfMessage,
        messages,
        setMessages,
        friends,
        setFriends,
      }}
    >
      {children}
    </Context.Provider>
  );
};