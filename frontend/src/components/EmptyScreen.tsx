import React from "react";
import { BsChatSquareDots } from "react-icons/bs";

const EmptyScreen = () => {
  return (
    <>
      <BsChatSquareDots size={50} />
      <p className="text-sm mb-3 ml-3">Select a chat to start messaging</p>
    </>
  );
};

export default EmptyScreen;
