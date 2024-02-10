"use client";

import Loading from "@/components/Loading";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex h-[calc(100vh-72px)] justify-center items-center">
      <ClerkLoading>
        <Loading size={9} />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp appearance={theme === "dark" ? { baseTheme: dark } : {}} />
      </ClerkLoaded>
    </div>
  );
}
