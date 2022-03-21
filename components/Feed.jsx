import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main className="mx-auto grid grid-cols-1 md:grid-cols-3 md:max-w-4xl xl:max-w-5xl sm:px-5">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="col-span-1">
        <div className="fixed mx-5 lg:mx-10 ">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
