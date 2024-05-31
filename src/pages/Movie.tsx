import { useParams } from "react-router-dom";

export const Movie = () => {
  const { name } = useParams();
  return <div>Movie {name}</div>;
};
