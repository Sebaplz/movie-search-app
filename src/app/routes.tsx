import { Route, Routes } from "react-router-dom";
import { Home, Movie } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:imdbID" element={<Movie />} />
    </Routes>
  );
};
