import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useSearchMovies";
import { Spinner } from "../components";

export const Movie: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { data, error, isLoading } = useMovieDetails(title!);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <main className="flex flex-col items-center gap-4">
      {data && data.Response === "False" && <p>{data.Error}</p>}
      {data && data.Response === "True" && (
        <div>
          <h1>{data.Title}</h1>
          <img src={data.Poster} alt={data.Title} />
          <p>{data.Plot}</p>
          <p>
            <strong>Director:</strong> {data.Director}
          </p>
          <p>
            <strong>Actors:</strong> {data.Actors}
          </p>
          <p>
            <strong>Genre:</strong> {data.Genre}
          </p>
          <p>
            <strong>Released:</strong> {data.Released}
          </p>
          <p>
            <strong>Runtime:</strong> {data.Runtime}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {data.imdbRating}
          </p>
          <p>
            <strong>Metascore:</strong> {data.Metascore}
          </p>
        </div>
      )}
    </main>
  );
};
