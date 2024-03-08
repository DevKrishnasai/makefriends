"use client";
import { useContext, useEffect, useRef } from "react";
import { BiDotsVerticalRounded, BiPhone, BiVideo } from "react-icons/bi";
import { disableScrolling, enableScrolling } from "@/lib/scrollFunctions";
import { useTheme } from "next-themes";
import { v4 as uuid } from "uuid";
import { Context } from "@/providers/globalProvider";
import { Input } from "./ui/input";
import ChatBubble from "./ChatBubble";
import EmptyScreen from "./EmptyScreen";
import { useChats } from "@/customhooks/useChats";
import Loading from "./Loading";

const ChatScreen = () => {
  const { theme } = useTheme();
  const context = useContext(Context);
  const controller = new AbortController();
  const loading = useChats();
  const lastMsg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMsg.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [context.messages]);

  const sendMessage = async (id: string) => {
    console.log("i am sending message ");
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API}/messages/post`,
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id,
            senderId: context.user?.id,
            receiverId: context.select?.id,
            message: context.message.message,
            messageType: context.message.messageType,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {context.select ? (
        <>
          <div className="p-2 px-3 flex justify-between items-center border-black dark:border-white w-full bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`${context.select.avatar}`} />
                </div>
              </div>
              <div className="flex flex-col ">
                <p className="font-bold text-lg">{context.select.username}</p>
                <p className="text-xs font-bold">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BiPhone size={23} />
              <BiVideo size={23} />
              <BiDotsVerticalRounded size={23} className="font-bold" />
            </div>
          </div>
          <div
            id="chatscreen"
            className={`h-[calc(100vh-190px)]  px-2 overflow-y-auto scroll-smooth z-0 w-full bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-black dark:border-white
        ${theme === "light" ? " apply" : " "}`}
            onScroll={() => disableScrolling("#chatscreen")}
            onMouseMove={() => enableScrolling("#chatscreen")}
            // onClick={enableScrolling}
            onMouseLeave={() => enableScrolling("#chatscreen")}
            onWheel={() => enableScrolling("#chatscreen")}
            onTouchMove={() => enableScrolling("#chatscreen")}
            onTouchEnd={() => enableScrolling("#chatscreen")}
            onTouchCancel={() => enableScrolling("#chatscreen")}
          >
            {loading ? (
              <Loading />
            ) : (
              context.messages.map((message) => {
                return (
                  <div key={message.id} ref={lastMsg}>
                    <ChatBubble message={message} context={context} />
                  </div>
                );
              })
            )}
          </div>
          <div className="w-full flex justify-between items-center border-1 bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-black dark:border-white">
            <Input
              placeholder="type a message..."
              type="text"
              className="z-0 bg-transparent "
              value={context.message.message}
              onChange={(e) =>
                context.setMessage((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!context.message.message?.length) {
                    return;
                  }
                  const id = uuid().toString();
                  context.setMessage({
                    id,
                    messageType: "text",
                    receiverId: context.select!.id,
                    senderId: context.user!.id,
                    message: context.message.message,
                  });
                  context.setMessages((prev) => [
                    ...prev,
                    {
                      id,
                      messageType: "text",
                      receiverId: context.select!.id,
                      senderId: context.user!.id,
                      message: context.message.message,
                    },
                  ]);
                  context.setMessage((prev) => ({
                    id: "",
                    messageType: "text",
                    receiverId: context.select!.id,
                    senderId: context.user!.id,
                    message: "",
                  }));
                  console.log({
                    id,
                    messageType: "text",
                    receiverId: context.select!.id,
                    senderId: context.user!.id,
                    message: context.message.message,
                  });
                  sendMessage(id);
                }
              }}
            />
            {/* <Input type="file" className="z-0 w-6" /> */}
          </div>
        </>
      ) : (
        <div className=" h-full w-full flex justify-center items-center border-black dark:border-white bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border">
          <EmptyScreen />
        </div>
      )}
    </>
  );
};

export default ChatScreen;
