import React from "react";

const SingleRow = () => {
  return (
    <div className="flex items-center gap-2 w-full my-2">
      <div className="avatar online ">
        <div className="w-12 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="font-bold w-full ml-2">
        <p className="text-xl">Krishna Sai</p>
        <p className="text-[10px]">hi man!!</p>
      </div>
    </div>
  );
};

export default SingleRow;
