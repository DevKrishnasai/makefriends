"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = io("http://localhost:4000");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
    setLoading(false);
  }, []);

  return [socket, loading];
};
