export interface OmdbApiResponseSuccess {
  Search: Search[];
  totalResults: string;
  Response: "True";
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string;
}

export enum Type {
  Movie = "movie",
  Series = "series",
}

export interface OmdbApiResponseError {
  Response: "False";
  Error: string;
}

export type OmdbApiResponse = OmdbApiResponseSuccess | OmdbApiResponseError;
