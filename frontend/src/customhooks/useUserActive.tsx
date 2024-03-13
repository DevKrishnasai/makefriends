"use client";
import { SocketContext } from "@/providers/SocketProvider";
import { useState, useEffect, useContext } from "react";

export default function useUserActive() {
  const [isTabActive, setIsTabActive] = useState(true);
  const socketcontext = useContext(SocketContext);

  useEffect(() => {
    const onFocus = () => setIsTabActive(true);
    const onBlur = () => {
      setIsTabActive(false);
      console.log("Socket Context:", socketcontext);
      if (socketcontext?.socket) {
        console.log("Closing socket connection...");
        socketcontext.socket.close();
        socketcontext.setSocket(null);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsTabActive(true);
      } else {
        console.log(
          "Tab visibility changed to hidden. Disconnecting from server..."
        );
        setIsTabActive(false);
        // Disconnect from the server when tab becomes inactive
        if (socketcontext?.socket) {
          console.log("Closing socket connection...");
          socketcontext.socket.close();
          socketcontext.setSocket(null);
        }
      }
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      console.log("Component unmounted. Closing socket connection...");
      // Ensure socket connection is closed when component unmounts
      if (socketcontext?.socket) {
        console.log("Closing socket connection...");
        socketcontext.socket.close();
        socketcontext.setSocket(null);
      }
    };
  }, []);

  return isTabActive;
}
