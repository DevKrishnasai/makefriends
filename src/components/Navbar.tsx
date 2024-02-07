"use client";
import { ToggleButton } from "./ToggleButtun";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { SignOutButton, UserButton, useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const Navbar = () => {
  const { theme } = useTheme();
  const { push } = useRouter();
  const { userId, isLoaded } = useAuth();
  console.log(userId);
  console.log(isLoaded);

  return (
    <div className="w-full py-4 ">
      <div className="flex flex-row items-center gap-3">
        {/* <BiLogoAmazon size={40} /> */}
        <p
          className="font-bold text-4xl cursor-pointer z-10"
          onClick={() => push("/")}
        >
          Logo
        </p>
        <div className="flex-1 flex items-center justify-end gap-3">
          <ToggleButton />
          {!userId && (
            <Button
              className="font-bold z-0 flex items-center "
              onClick={() => {
                push("/sign-in");
              }}
            >
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          )}
          {userId && (
            <Button
              className="font-bold z-0 flex items-center "
              onClick={() => {
                push("/");
              }}
            >
              {/* <LogIn className="mr-2 h-4 w-4" /> Login */}
              {isLoaded ? <SignOutButton /> : <Loading />}
            </Button>
          )}
          <UserButton
            appearance={theme === "dark" ? { baseTheme: dark } : {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
