import { Socket } from "socket.io-client";

export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  friends?: string;
  createdAt?: Date;
}

export interface IContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  select: IUser | null;
  setSelect: React.Dispatch<React.SetStateAction<IUser | null>>;
  message: IMessage;
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>;
  typeOfMessage: MessageType;
  setTypeOfMessage: React.Dispatch<React.SetStateAction<MessageType>>;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  friends: IUser[];
  setFriends: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message?: string;
  messageType: MessageType;
  createdAt?: Date;
}

export type MessageType = "text" | "image" | "file";

export interface ISocketContext {
  socket: Socket;
  setSocket: React.Dispatch<React.SetStateAction<Socket>>;
  onlineUsers: string[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
}
