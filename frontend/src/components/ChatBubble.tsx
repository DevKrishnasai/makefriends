"use client";
import { IContext, IMessage } from "@/lib/types";
import React from "react";

const ChatBubble = ({
  message,
  context,
}: {
  message: IMessage;
  context: IContext;
}) => {
  const isCurrentUser = message.senderId === context.user?.id;

  return (
    <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt={`${
              isCurrentUser ? context.user?.username : context.select?.username
            }'s avatar`}
            src={isCurrentUser ? context.user?.avatar : context.select?.avatar}
          />
        </div>
      </div>
      <div className="chat-header">
        {isCurrentUser ? context.user?.username : context.select?.username}
        <time className="text-xs opacity-50">
          {new Date(message.createdAt || "").toLocaleTimeString()}
        </time>
      </div>
      <div className="chat-bubble">{message.message}</div>
      <div className="chat-footer opacity-50">{message.messageType}</div>
    </div>
  );
};

export default ChatBubble;
