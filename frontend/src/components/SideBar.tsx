"use client";
import React from "react";
import SingleRow from "./SingleRow";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { disableScrolling, enableScrolling } from "@/lib/scrollFunctions";

const SideBar = () => {
  const { theme } = useTheme();

  return (
    // <div className="w-full overflow-auto z-0">
    <div
      // className={`ml-2 flex flex-col gap-2 z-0 overflow-y-scroll ${
      //   theme == "light" ? " apply-bar-color" : ""
      // }`}
      id="sidebar"
      className={cn(
        "ml-2 flex flex-col z-0 overflow-y-auto scroll-smooth divide-slate-950  dark:divide-sky-200",
        theme === "light" ? "apply" : " "
      )}
      onScroll={() => disableScrolling("#sidebar")}
      onMouseMove={() => enableScrolling("#sidebar")}
      // onClick={enableScrolling}
      onMouseLeave={() => enableScrolling("#sidebar")}
      onWheel={() => enableScrolling("#sidebar")}
      onTouchMove={() => enableScrolling("#sidebar")}
      onTouchEnd={() => enableScrolling("#sidebar")}
      onTouchCancel={() => enableScrolling("#sidebar")}
    >
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
      <SingleRow />
    </div>
    // </div>
  );
};

export default SideBar;
