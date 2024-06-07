import React from "react";
import { SearchForm, Spinner } from "../components";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { SearchSchema } from "../schemas/searchSchema";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const { data, error, isLoading } = useSearchMovies(query);

  const handleSearch = (data: SearchSchema) => {
    setQuery(data.query);
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-4">
      <h1 className="text-4xl">Movie Search App</h1>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <Spinner />}
      {error && <p>{error.message}</p>}
      {data && data.Response === "False" && <p>{data.Error}</p>}
      {data && data.Response === "True" && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.Search.map((movie) => (
            <li key={movie.imdbID}>
              <Link to={`/movie/${movie.Title}`}>
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
