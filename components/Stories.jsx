import { React, useEffect, useState, useRef } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);

  // Use fakerjs to generate 20 random people. used javascript logic combined with faker js docs.
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="relative flex items-center space-x-4 overflow-x-scroll py-6 px-2 bg-white border border-gray-200 rounded-md sm:mt-8 scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded-full scroll-smooth">
      {/* all of the stories  */}
      <Story
        username={session?.user?.username}
        name={session?.user?.name}
        image={session?.user?.image}
      />
      {suggestions.map((profile) => {
        return (
          <Story
            key={profile.id}
            username={profile.username}
            name={profile.name}
            image={profile.avatar}
          />
        );
      })}
    </div>
  );
};

export default Stories;
