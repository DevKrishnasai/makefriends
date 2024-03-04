"use client";
import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import useInitialFetch from "@/customhooks/useInitialFetch";
import Loading from "@/components/Loading";
const page = () => {
  const [user, loading] = useInitialFetch();
  // useEffect(() => {
  //   checkUser();
  //   // const socket = io("http://localhost:4000");
  //   // socket.on("connect", () => {
  //   //   // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  //   // });

  //   // socket.on("disconnect", () => {
  //   //   // console.log(socket.id); // undefined
  //   // });
  // }, []);

  return (
    <div className="flex h-[calc(100vh-72px)] w-full gap-3 p-2">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading size={10} />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-1/3 border rounded-md border-black dark:border-white">
            <form className="p-2 z-0">
              <Input
                type="search"
                placeholder="search..."
                className="bg-transparent"
              />
            </form>
            <SideBar />
          </div>
          <div className="w-full flex flex-col gap-3 ">
            <ChatScreen />
          </div>
        </>
      )}
    </div>
  );
};

export default page;
