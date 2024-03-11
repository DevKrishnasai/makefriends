"use client";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { cn } from "@/lib/utils";

export function ToggleButton() {
  const { setTheme, theme } = useTheme();

  return (
    // <Button onClick={ToggleButton} className="z-10">
    //   {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    // </Button>

    <div
      className={cn(
        "relative hover:rounded-full flex justify-center items-center p-1",
        theme === "dark"
          ? "hover:bg-white hover:text-black"
          : "hover:bg-black hover:text-white"
      )}
    >
      {theme === "dark" ? (
        <MdLightMode
          size={24}
          onClick={() => setTheme("light")}
          className={cn(
            " rounded-full z-1",
            theme === "dark"
              ? "hover:bg-white hover:text-black"
              : "hover:bg-black hover:text-white"
          )}
        />
      ) : (
        <MdDarkMode
          size={24}
          onClick={() => setTheme("dark")}
          className={cn(
            "z-1 rounded-full",
            theme === "dark"
              ? "hover:bg-white hover:text-black"
              : "hover:bg-black hover:text-white"
          )}
        />
      )}
    </div>

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
