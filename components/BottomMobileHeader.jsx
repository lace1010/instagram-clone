import { React, useState } from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";

const BottomMobileHeader = () => {
  const { data: session } = useSession();
  const [profileClicked, setProfileClicked] = useState(false);

  const showSignOut = () => {
    profileClicked ? setProfileClicked(false) : setProfileClicked(true);
  };
  return (
    <div className="fixed bottom-0 z-50 sm:hidden w-screen flex justify-between py-3 px-5 border-t shadow-sm bg-white">
      <HomeIcon className="headerIcon" />
      <SearchIcon className="headerIcon" />
      <PlusCircleIcon className="headerIcon" />
      <HeartIcon className="headerIcon" />

      <img
        onClick={showSignOut}
        className="h-7 w-7 rounded-full cursor-pointer"
        src={session?.user?.image}
        alt="profile pic"
      />
      <div
        onClick={signOut}
        className={`absolute ${
          profileClicked ? "block" : "hidden"
        } sm:hidden right-0 bottom-14 px-6 py-2 bg-white border shadow-md cursor-pointer`}
      >
        <span>SignOut</span>
      </div>
    </div>
  );
};

export default BottomMobileHeader;
