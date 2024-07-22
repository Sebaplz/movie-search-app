import axios, { AxiosInstance } from "axios";
import { OmdbApiInfoResponse, OmdbApiResponse } from "./interfaces";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "http://www.omdbapi.com";

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    apikey: API_KEY,
  },
});

export const omdbApi = {
  searchMovies: async (title: string): Promise<OmdbApiResponse> => {
    const response = await instance.get("/", {
      params: {
        s: title,
      },
    });
    return response.data;
  },
  getMovie: async (imdbID: string): Promise<OmdbApiInfoResponse> => {
    const response = await instance.get("/", {
      params: {
        i: imdbID,
      },
    });
    return response.data;
  },
};
