"use client";
import Navbar from "@/components/Navbar";
import { ToggleButton } from "@/components/ToggleButtun";
import { useTheme } from "next-themes";

export default function Home() {
  return (
    <div className="relative h-full w-full bg-white dark:bg-[#0000002e]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="xl:max-w-7xl mx-auto min-h-screen">
        <Navbar />
      </div>
    </div>
  );
}
