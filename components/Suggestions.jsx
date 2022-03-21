import { React, useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-5">
        <h3 className=" text-sm font-semibold text-gray-400">
          Suggestions for you
        </h3>
        <button className=" text-sm font-medium text-gray-800 cursor-pointer">
          See all
        </button>
      </div>

      {suggestions.map((profile) => (
        <div key={profile.id} className="flex items-center space-x-3 mt-3">
          <img
            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            src={profile.avatar}
            alt="user"
          />
          <div className="flex-1 mx-4">
            <h2 className="font-semibold text-sm truncate">
              {profile.username}
            </h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="text-blue-400 text-sm font-semibold cursor-pointer">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
