import React from "react";
import { SearchForm, Spinner } from "../components";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { SearchSchema } from "../schemas/searchSchema";
import { Link } from "react-router-dom";
import { OmdbApiInfoResponseError, OmdbApiResponse } from "../api/interfaces";

function isErrorResponse(
  data: OmdbApiResponse
): data is OmdbApiInfoResponseError {
  return data.Response === "False";
}

export const Home: React.FC = () => {
  const [query, setQuery] = React.useState(() => {
    try {
      return localStorage.getItem("lastSearch") || "";
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return "";
    }
  });

  const { data, error, isLoading } = useSearchMovies(query);

  const handleSearch = (data: SearchSchema) => {
    const searchQuery = data.query;
    setQuery(searchQuery);
    try {
      localStorage.setItem("lastSearch", searchQuery);
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-4">
      <h1 className="text-4xl">Movie Search App</h1>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <Spinner />}
      {error && <p>{error.message}</p>}
      {data && isErrorResponse(data) && <p>{data.Error}</p>}
      {data && !isErrorResponse(data) && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.Search.map((movie) => (
            <li key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  loading="lazy"
                  className="w-full h-[450px] aspect-[9/16] object-cover rounded-lg shadow-md"
                />
              </Link>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
