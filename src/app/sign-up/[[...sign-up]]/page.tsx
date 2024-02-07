"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex h-[calc(100vh-72px)] justify-center items-center">
      <SignUp appearance={theme === "dark" ? { baseTheme: dark } : {}} />
    </div>
  );
}
