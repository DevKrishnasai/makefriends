"use client";
import { IContext, IFriends, IMessage, IUser } from "@/lib/types";
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
  messages: [],
  setMessages: () => [],
  friends: [],
  setFriends: () => [],
  search: "",
  setSearch: () => "",
  searchFriends: [],
  setSearchFriends: () => [],
  notifications: [],
  setNotifications: () => [],
  onlineUsers: [],
  setOnlineUsers: () => [],
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  //for holding login user information
  const [user, setUser] = useState<IUser | null>(null);
  //for holding selected user information
  const [select, setSelect] = useState<IUser | null>(null);
  //for holding message (now sending)
  const [message, setMessage] = useState<IMessage>({
    id: "",
    message: "",
    messageType: "text",
    senderId: "",
    receiverId: "",
  });
  //for holding messages
  const [messages, setMessages] = useState<IMessage[]>([]);
  //for holding friends
  const [friends, setFriends] = useState<IFriends[]>([]);

  const [search, setSearch] = useState<string>("");
  const [searchFriends, setSearchFriends] = useState<IUser[]>([]);

  const [notifications, setNotifications] = useState<IUser[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  return (
    <Context.Provider
      value={{
        select,
        setSelect,
        message,
        setMessage,
        user,
        setUser,
        messages,
        setMessages,
        friends,
        setFriends,
        search,
        setSearch,
        searchFriends,
        setSearchFriends,
        notifications,
        setNotifications,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
