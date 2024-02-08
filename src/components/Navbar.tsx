"use client";
import { LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

import { ToggleButton } from "./ToggleButtun";
import { Button } from "./ui/button";
import Loading from "./Loading";

const Navbar = () => {
  const { theme } = useTheme();
  const { userId, isLoaded } = useAuth();
  console.log(userId);
  console.log(isLoaded);
  return (
    <div className="w-full py-4 ">
      <div className="flex flex-row items-center gap-3">
        {/* <BiLogoAmazon size={40} /> */}
        <Link href="/" className="font-bold text-4xl cursor-pointer z-10">
          logo
        </Link>
        <div className="flex-1 flex items-center justify-end gap-3">
          <ToggleButton />
          {!userId && (
            <Link href="/sign-in" className="z-0  ">
              <Button className="font-bold flex items-center">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
          {userId && (
            <>
              <ClerkLoading>
                <Button>
                  <Loading />
                </Button>
              </ClerkLoading>
              <ClerkLoaded>
                <Button className="font-bold  flex items-center z-0">
                  <SignOutButton />
                </Button>
              </ClerkLoaded>
            </>
          )}

          {userId && (
            <>
              <ClerkLoading>
                <Avatar>
                  <AvatarFallback className="bg-white dark:bg-black">
                    <Loading />
                  </AvatarFallback>
                </Avatar>
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton
                  appearance={theme === "dark" ? { baseTheme: dark } : {}}
                />
              </ClerkLoaded>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
