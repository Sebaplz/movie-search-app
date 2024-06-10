import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchSchema } from "../schemas/searchSchema";

interface SearchFormProps {
  onSubmit: (data: SearchSchema) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative w-96">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          placeholder="Search for a movie or TV show"
          {...register("query")}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {errors.query && (
        <p className="text-red-500 p-2">{errors.query.message}</p>
      )}
    </form>
  );
};
