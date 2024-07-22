import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useSearchMovies";
import { Spinner } from "../components";
import {
  OmdbApiInfoResponse,
  OmdbApiInfoResponseError,
} from "../api/interfaces";

function isErrorResponse(
  data: OmdbApiInfoResponse
): data is OmdbApiInfoResponseError {
  return data.Response === "False";
}

export const Movie: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const { data, error, isLoading } = useMovieDetails(imdbID!);

  useEffect(() => {
    if (data && !isErrorResponse(data)) {
      document.title = data.Title || "Movie Details";
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <main className="min-h-screen flex items-center">
      <article className="flex flex-col mx-auto gap-4 my-4 w-[22rem] md:w-[35rem] lg:w-[50rem] border-2 rounded-xl border-[#21293b] items-center justify-center">
        {data && isErrorResponse(data) && (
          <p className="text-red-500">{data.Error}</p>
        )}
        {data && !isErrorResponse(data) && (
          <div className="flex flex-col lg:flex-row ml-4 text-[#ccd3e3]">
            <img
              src={data.Poster}
              alt={data.Title}
              className="w-full aspect-[10/14] object-cover rounded-xl max-w-[250px] mx-auto my-4"
            />
            <div className="lg:p-4">
              <h1 className="text-xl font-semibold">{data.Title}</h1>
              <div className="flex gap-2 my-2">
                {data.Genre.split(",").map((genre) => (
                  <p
                    key={genre.trim()}
                    className="bg-[#21293b] py-1 px-3 rounded-full"
                  >
                    {genre.trim()}
                  </p>
                ))}
              </div>
              <p>{data.Plot}</p>
              <div className="text-sm my-2">
                <p>
                  Director: <span className="text-white">{data.Director}</span>
                </p>
                <p>
                  Actors: <span className="text-white">{data.Actors}</span>
                </p>
                <p>
                  Genre: <span className="text-white">{data.Genre}</span>
                </p>
                <p>
                  Released: <span className="text-white">{data.Released}</span>
                </p>
                <p>
                  Runtime: <span className="text-white">{data.Runtime}</span>
                </p>
                <p>
                  IMDB Rating:{" "}
                  <span className="text-white">{data.imdbRating}</span>
                </p>
                <p>
                  Metascore:{" "}
                  <span className="text-white">{data.Metascore}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </article>
    </main>
  );
};
