import React from "react";
import { signIn } from "next-auth/react";
const Welcome = () => {
  const bgImage = {
    backgroundImage: `url(
          "https://onlypult.com/blog_uploads/0165300532a86adc781657326fe37d79.png"
        )`,
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center px-10"
      style={bgImage}
    >
      <div className="flex flex-col items-center bg-purple-100 p-16 rounded-xl bg-opacity-70">
        <h1 className="p-5 font-bold text-3xl text-purple-600 text-center">
          Welcome to my Instagram!
        </h1>
        <button
          onClick={signIn}
          className="py-3 px-8 bg-blue-500 rounded-lg text-white"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Welcome;
