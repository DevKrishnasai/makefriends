"use client";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ToggleButton() {
  const { setTheme, theme } = useTheme();

  return (
    // <Button onClick={ToggleButton} className="z-10">
    //   {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    // </Button>

    theme === "dark" ? (
      <Button onClick={() => setTheme("light")} className="z-0 rounded-full">
        <MdLightMode />
      </Button>
    ) : (
      <Button onClick={() => setTheme("dark")} className="z-0 rounded-full">
        <MdDarkMode />
      </Button>
    )

    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild className="dark:bg-[#0000002e]">
    //     <Button variant="outline" size="icon">
    //       <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="dark:bg-[#0000002e]">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       Dark
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("system")}>
    //       System
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
