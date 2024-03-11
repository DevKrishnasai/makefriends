"use client";
import { useContext, useEffect, useRef } from "react";
import { BiDotsVerticalRounded, BiPhone, BiVideo } from "react-icons/bi";
import { useTheme } from "next-themes";
import { v4 as uuid } from "uuid";
import { Context } from "@/providers/globalProvider";
import { Input } from "./ui/input";
import ChatBubble from "./ChatBubble";
import EmptyScreen from "./EmptyScreen";
import { useChats } from "@/customhooks/useChats";
import Loading from "./Loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SocketContext } from "@/providers/SocketProvider";

const ChatScreen = () => {
  const { theme } = useTheme();
  const context = useContext(Context);
  const controller = new AbortController();
  const loading = useChats();
  const lastMsg = useRef<HTMLDivElement>(null);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    setTimeout(() => {
      lastMsg.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [context.messages.length, socketContext?.typing.message]);

  useEffect(() => {
    if (socketContext?.socket) {
      if (context.select && context.select.id && context.message.message) {
        if (context.message.message.length > 0) {
          socketContext?.socket.emit("typing", {
            senderId: context.user!.id,
            receiverId: context.select.id,
            message: context.message.message,
          });
        }
      }
      socketContext.socket.on("typing", (obj) => {
        socketContext.setTyping(obj);
      });
    }
  }, [context.message.message, context.select]);

  const sendMessage = async (id: string) => {
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
          <div className="relative p-2 px-3 flex justify-between items-center border-black dark:border-white w-full bg-white-0 rounded-md bg-clip-padding backdrop-filter  border">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`${context.select.avatar}`} />
                </div>
              </div>
              <div className="flex flex-col ">
                <p className="font-bold text-lg">{context.select.username}</p>
                <p className="text-xs font-bold">
                  {context.onlineUsers.includes(context.select.id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BiPhone size={23} />
              <BiVideo size={23} />
              <BiDotsVerticalRounded size={23} className="font-bold" />
            </div>
          </div>
          <div
            className={`h-[calc(100vh-190px)]  px-2 overflow-y-auto scroll-smooth z-0 w-full bg-white-0 rounded-md bg-clip-padding border border-black dark:border-white`}
          >
            {loading ? (
              <div className="h-full w-full flex justify-center items-center">
                <Loading />
              </div>
            ) : context.messages.length === 0 ? (
              socketContext?.typing && socketContext.typing.message ? (
                context.onlineUsers.includes(context.select.id) &&
                socketContext &&
                socketContext.typing.message.length > 1 && (
                  <div ref={lastMsg} className="">
                    <ChatBubble
                      message={{
                        ...socketContext!.typing,
                        id: "typing",
                        createdAt: new Date(),
                        messageType: "text",
                      }}
                      typing={true}
                      context={context}
                    />
                  </div>
                )
              ) : (
                <div className="flex h-full justify-center items-center">
                  <p>Start messaging 🫵</p>
                </div>
              )
            ) : (
              <ScrollArea className="h-full w-full">
                {context.messages.map((message) => {
                  return (
                    <div key={message.id} ref={lastMsg}>
                      <ChatBubble message={message} context={context} />
                    </div>
                  );
                })}
                {/* <div className="absolute bottom-0 left-0 w-full h-full"> */}
                {context.onlineUsers.includes(context.select.id) &&
                  socketContext &&
                  socketContext.typing.message.length > 1 && (
                    <div ref={lastMsg} className="">
                      <ChatBubble
                        message={{
                          ...socketContext!.typing,
                          id: "typing",
                          createdAt: new Date(),
                          messageType: "text",
                        }}
                        typing={true}
                        context={context}
                      />
                    </div>
                  )}
                {/* </div> */}
              </ScrollArea>
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
                    createdAt: new Date(),
                  });
                  context.setMessages((prev) => [
                    ...prev,
                    {
                      id,
                      messageType: "text",
                      receiverId: context.select!.id,
                      senderId: context.user!.id,
                      message: context.message.message,
                      createdAt: new Date(),
                    },
                  ]);
                  context.setMessage((prev) => ({
                    id: "",
                    messageType: "text",
                    receiverId: context.select!.id,
                    senderId: context.user!.id,
                    message: "",
                    createdAt: new Date(),
                  }));
                  sendMessage(id);
                }
              }}
            />
            {/* <Input type="file" className="z-0 w-6" /> */}
          </div>
        </>
      ) : (
        <div className=" h-full w-full flex justify-center items-center border-black dark:border-white bg-white-0 rounded-md bg-clip-padding  border">
          <EmptyScreen />
        </div>
      )}
    </>
  );
};

export default ChatScreen;
