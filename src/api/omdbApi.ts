import axios from "axios";
import { OmdbApiResponse } from "./interfaces";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "http://www.omdbapi.com";

export const omdbApi = {
  searchMovies: async (title: string): Promise<OmdbApiResponse> => {
    const response = await axios.get(
      `${API_URL}/?apikey=${API_KEY}&s=${title}`
    );
    return response.data;
  },
};
