"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex h-[calc(100vh-72px)] justify-center items-center">
      <SignIn appearance={theme === "dark" ? { baseTheme: dark } : {}} />
    </div>
  );
}
