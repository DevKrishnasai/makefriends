import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs";

const IntroPage = () => {
  const { userId } = auth();
  return (
    <div className="w-full h-full ">
      <div className="mx-auto h-[calc(100vh-72px)] w-[60%] text-center flex flex-col justify-center items-center gap-8">
        <p className="text-5xl font-bold text-black  dark:text-white ">
          A powerful Chat Application with a variety of realtime functionalitys
        </p>
        <div className="flex justify-center items-center gap-3 z-0">
          {userId ? (
            <Link href="/chat" className="cursor-pointer">
              <Button className="font-bold">Chat</Button>
            </Link>
          ) : (
            <Link href="/sign-up" className="cursor-pointer">
              <Button className="font-bold">Get Started</Button>
            </Link>
          )}
          <Link href="/features" className="cursor-pointer">
            <Button className="z-0 font-bold">Check Features</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
