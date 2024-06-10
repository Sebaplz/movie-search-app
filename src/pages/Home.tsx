import React from "react";
import { OmdbApiInfoResponseError, OmdbApiResponse } from "../api/interfaces";
import { Carousel, SearchForm, Spinner } from "../components";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { SearchSchema } from "../schemas/searchSchema";

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
      {data && !isErrorResponse(data) && <Carousel items={data.Search} />}
    </main>
  );
};
