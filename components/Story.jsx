import React from "react";

const Story = ({ image, name, username }) => {
  return (
    <div className="">
      <img
        className="h-14 w-14 p-[1.5px] border border-red-500 rounded-full object-contain cursor-pointer"
        src={image}
        layout="fixed"
        alt="user profile pic"
      />
      {/* truncate adds ... so we don't got to conditions with slice in username */}
      <p className="text-xs text-center w-14 truncate">{username}</p>
    </div>
  );
};

export default Story;
