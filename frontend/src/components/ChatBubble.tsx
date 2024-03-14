"use client";
import { IContext, IMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

const ChatBubble = ({
  message,
  context,
  typing,
}: {
  message: IMessage;
  context: IContext;
  typing?: boolean;
}) => {
  const isCurrentUser = message.senderId === context.user?.id;

  if (message.message?.length && message.id === "typing") {
    return message.senderId === context.select!.id ? (
      <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
        <div className={`chat-image avatar ${isCurrentUser ? "md-6" : "mb-6"}`}>
          <div className="w-10 rounded-full">
            <img
              alt={`${
                isCurrentUser
                  ? context.user?.username
                  : context.select?.username
              }'s avatar`}
              src={
                isCurrentUser ? context.user?.avatar : context.select?.avatar
              }
            />
          </div>
        </div>

        <div
          className={cn(
            "chat-bubble bg-black dark:border-2 dark:border-green-50 text-white dark:text-white flex break-all"
          )}
        >
          {message.message}
          <span className="loading loading-dots loading-xs self-end"></span>
        </div>
      </div>
    ) : null;
  }

  return (
    <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
      <div className={`chat-image avatar ${isCurrentUser ? "md-6" : "mb-6"}`}>
        <div className="w-10 rounded-full">
          <img
            alt={`${
              isCurrentUser ? context.user?.username : context.select?.username
            }'s avatar`}
            src={isCurrentUser ? context.user?.avatar : context.select?.avatar}
          />
        </div>
      </div>

      <div
        className={cn(
          "chat-bubble bg-black dark:border-2 dark:border-green-50 text-white dark:text-white break-words"
        )}
      >
        {message.message}
      </div>
      <div
        className={cn("text-[10px] font-semibold text-black dark:text-white")}
      >
        {new Date(message.createdAt!).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatBubble;
