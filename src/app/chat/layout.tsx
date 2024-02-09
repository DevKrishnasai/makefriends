import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bgImage h-full w-full absolute top-0 left-0 overflow-hidden"></div>

      {children}
    </>
  );
};

export default layout;
