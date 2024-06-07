import axios, { AxiosInstance } from "axios";
import { OmdbApiResponse } from "./interfaces";

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
};
