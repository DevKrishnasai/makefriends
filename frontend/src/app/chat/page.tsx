"use client";

import ChatScreen from "@/components/ChatScreen";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import useInitialFetch from "@/customhooks/useInitialFetch";
import Loading from "@/components/Loading";
import { SocketProvider } from "@/providers/SocketProvider";

const page = () => {
  const userLoading = useInitialFetch();
  return (
    <SocketProvider>
      <div className="flex h-[calc(100vh-72px)] w-full gap-3 p-2">
        {userLoading ? (
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
    </SocketProvider>
  );
};

export default page;
