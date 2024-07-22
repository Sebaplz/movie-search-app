import React from "react";
import { Link } from "react-router-dom";
import { Search } from "../api/interfaces";

interface ListMovieProps {
  items: Search[];
}

export const ListMovie: React.FC<ListMovieProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-4 mb-4 w-[22rem] md:w-[35rem] lg:w-[50rem]">
      {items.map((item) => (
        <Link
          key={item.imdbID}
          to={`/movie/${item.imdbID}`}
          className="hover:opacity-60"
        >
          <div className="flex flex-col md:flex-row p-4 border-2 rounded-xl border-[#21293b] justify-center items-center md:items-start">
            <img
              src={item.Poster}
              alt={item.Title}
              className="w-full aspect-[10/14] object-cover rounded-xl max-w-[250px]"
            />

            <div className="pt-2 flex flex-col items-start w-full gap-1 md:ml-4">
              <h2 className="text-xl font-semibold text-[#ccd3e3]">
                {item.Title}
              </h2>
              <p className="text-[#ccd3e3]">Year: {item.Year}</p>
              <p className="bg-[#21293b] py-1 px-3 rounded-full text-[#ccd3e3]">
                {item.Type.charAt(0).toUpperCase() + item.Type.slice(1)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
