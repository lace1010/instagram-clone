import { useSession, signOut } from "next-auth/react";
import React from "react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-3 mt-14">
      <img
        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
        src={session?.user?.image}
        alt="user"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-semibold text-sm truncate">
          {session?.user?.username}
        </h2>
        <h3 className="text-xs text-gray-400">Welcome to Instagram</h3>
      </div>
      <button
        onClick={signOut}
        className="text-blue-400 text-sm font-semibold flex-shrink-0 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
