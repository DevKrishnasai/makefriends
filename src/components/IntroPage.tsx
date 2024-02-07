"use client";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const IntroPage = () => {
  const { push } = useRouter();
  return (
    <div className="w-full h-full">
      <div className="mx-auto h-[calc(100vh-72px)] w-1/2 text-center flex flex-col justify-center items-center gap-4">
        <p className="text-5xl font-bold tracking-wide">
          A powerful Chat Application with a variety of functions
        </p>
        <div className="flex justify-center items-center gap-3">
          <Button className="cursor-pointer" onClick={() => push("/sign-up")}>
            GetStarted
          </Button>
          <Button
            onClick={() => {
              console.log("clicked");
              window.scrollTo(0, 5000);
            }}
          >
            Check Features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
