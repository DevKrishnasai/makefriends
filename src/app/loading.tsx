import Loading from "@/components/Loading";
import React from "react";

const loading = () => (
  <div className="flex h-[calc(100vh-72px)] justify-center items-center">
    <Loading size={10} />;
  </div>
);

export default loading;
