import { MovieResult } from "./MovieResult";

export interface OmdbApiResponse {
  Search: MovieResult[];
  totalResults: string;
  Response: string;
}
