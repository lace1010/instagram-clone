import { React, useState, useEffect } from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [profileClicked, setProfileClicked] = useState(false);

  const showSignOut = () => {
    profileClicked ? setProfileClicked(false) : setProfileClicked(true);
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="relative max-w-5xl mx-auto flex justify-between items-center px-5 py-2">
        <div className="sm:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            alt="small instagram"
            height={25}
            width={25}
            layout="fixed"
          />
        </div>
        <Image
          onClick={() => router.push("/")}
          className="cursor-pointer"
          src="https://links.papareact.com/ocw"
          alt="big instagram"
          height={50}
          width={130}
          layout="fixed"
        />
        {session && (
          <>
            <div className="mx-2 hidden sm:inline-flex justify-center items-center px-4 py-2 space-x-2 bg-gray-100 rounded-xl">
              <div>
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="bg-transparent text-gray-600 outline-none"
                type="text"
                placeholder="Search"
              />
            </div>
            <ChatIcon className="sm:hidden h-7 w-7" />
          </>
        )}

        {session ? (
          <>
            <div className="hidden sm:inline-flex justify-end space-x-4">
              <HomeIcon className="headerIcon" />
              <PaperAirplaneIcon className="headerIcon rotate-45" />
              <PlusCircleIcon
                onClick={() =>
                  openModal ? setOpenModal(false) : setOpenModal(true)
                }
                className="headerIcon"
              />
              <UserGroupIcon className="headerIcon" />
              <HeartIcon className="headerIcon" />

              <img
                onClick={showSignOut}
                className="h-7 w-7 rounded-full cursor-pointer"
                src={session?.user?.image}
                alt="profile"
              />
            </div>
            <div
              onClick={signOut}
              className={`absolute hidden ${
                profileClicked ? "sm:block" : ""
              } right-0 top-16 px-6 py-2 bg-white border shadow-md cursor-pointer`}
            >
              <span>SignOut</span>
            </div>
          </>
        ) : (
          <div className="flex space-x-2">
            <HomeIcon onClick={() => router.push("/")} className="headerIcon" />
            <button onClick={signIn} className="cursor-pointer">
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
