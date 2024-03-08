"use client";
import { SocketContext } from "@/providers/SocketProvider";
import React, { useContext, useEffect } from "react";

const useSocket = () => {
  const context = useContext(SocketContext);
  useEffect(() => {
    if (context?.socket) {
      console.log("in useSocket useEffect");
      context.socket.on("connect", () => {
        console.log("connected to socket");
      });
      context.socket.on("disconnect", () => {
        console.log("disconnected from socket");
      });
    } else {
      console.log("context is null");
    }
  }, [context?.socket]);
  return <div>useSocket</div>;
};

export default useSocket;
