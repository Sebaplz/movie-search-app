import { useQuery } from "@tanstack/react-query";
import { omdbApi } from "../api/omdbApi";
import { OmdbApiInfoResponse, OmdbApiResponse } from "../api/interfaces";

export const useSearchMovies = (title: string) => {
  return useQuery<OmdbApiResponse, Error>({
    queryKey: ["searchMovies", title],
    queryFn: () => omdbApi.searchMovies(title),
    enabled: !!title,
  });
};

export const useMovieDetails = (imdbID: string) => {
  return useQuery<OmdbApiInfoResponse, Error>({
    queryKey: ["movieDetails", imdbID],
    queryFn: () => omdbApi.getMovie(imdbID),
    enabled: !!imdbID,
  });
};
