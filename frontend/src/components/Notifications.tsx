"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Context } from "@/providers/globalProvider";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { IAccept } from "@/lib/types";

const Notifications = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useTheme();
  const context = useContext(Context);
  const [accept, setAccept] = useState<IAccept>({
    id: "",
    status: "Rejected",
    avatar: "",
    email: "",
    username: "",
    bio: "",
    createdAt: new Date(),
    friends: "",
  });
  useEffect(() => {
    const acceptTheUserRequest = async () => {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API}/request-accept-or-reject`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
              id: context.user!.id,
              acceptId: accept.id,
              status: accept.status,
            }),
          }
        );
        const response = await request.json();
        toast.success(response.message);
        if (response.message === "request accepted") {
          context.setFriends((prev) => [
            ...prev,
            {
              id: accept.id,
              avatar: accept.avatar,
              email: accept.email,
              username: accept.username,
              bio: accept.bio,
              createdAt: accept.createdAt,
              friends: accept.friends,
              message: "",
              messageFrom: "",
              messageType: "",
              lastTime: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (accept.id) {
      acceptTheUserRequest();
    }
  }, [accept.id]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div
          className={cn(
            "relative hover:rounded-full flex justify-center items-center p-1",
            theme === "dark"
              ? "hover:bg-white hover:text-black"
              : "hover:bg-black hover:text-white"
          )}
        >
          <IoNotifications size={24} className="" />
          {context &&
          context.notifications &&
          context.notifications.length > 0 ? (
            <span
              className={cn(
                "absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2  rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold bg-transparent text-black border-1 border-black",
                theme === "dark"
                  ? "bg-transparent text-white "
                  : "bg-transparent text-black "
              )}
            >
              {context.notifications.length}
            </span>
          ) : null}
        </div>
      </SheetTrigger>
      <SheetContent
        className={cn("bg-inherit", theme === "dark" && "bg-transparent")}
      >
        <SheetHeader>
          <SheetTitle>Notifications and friend requests</SheetTitle>
          <SheetDescription>
            {context &&
              context.notifications &&
              context.notifications.map((notification) => {
                return (
                  <div
                    className={cn(
                      "flex items-center my-2 ease-linear duration-300 p-1 rounded-md",
                      theme === "dark"
                        ? "hover:bg-white hover:text-black  "
                        : "hover:bg-black hover:text-white  "
                    )}
                    // onClick={() =>
                    //   select
                    //     ? onSelect((prev) => (prev!.id === user.id ? null : user))
                    //     : onSelect(user)
                    // }
                  >
                    <div className={`avatar} `}>
                      <div className="w-12 rounded-full">
                        <img
                          src={`${notification.avatar}`}
                          alt={`Avatar of ${notification.username}`}
                        />
                      </div>
                    </div>
                    <div className="font-bold w-full ml-2 ">
                      <p className="text-lg">{notification.username}</p>
                      <p className="text-[10px]">{notification.bio}</p>
                    </div>
                    <div className="flex items-center gap-3 mr-4">
                      <Check
                        onClick={() => {
                          context.setNotifications((notifications) =>
                            notifications.filter(
                              (each) => each.id !== notification.id
                            )
                          );
                          setAccept({
                            id: notification.id,
                            status: "Accepted",
                            avatar: notification.avatar,
                            email: notification.email,
                            username: notification.username,
                            bio: notification.bio,
                            createdAt: notification.createdAt,
                          });
                        }}
                      />
                      <X
                        onClick={() => {
                          context.setNotifications((notifications) =>
                            notifications.filter(
                              (each) => each.id !== notification.id
                            )
                          );
                          setAccept({
                            id: notification.id,
                            status: "Rejected",
                            avatar: notification.avatar,
                            email: notification.email,
                            username: notification.username,
                            bio: notification.bio,
                            createdAt: notification.createdAt,
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
