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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-[22rem] md:w-[35rem]">
        <button
          type="submit"
          className="text-white absolute bottom-2.5 text-sm px-4 py-2"
        >
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
        </button>
        <input
          placeholder="Search for a movie or TV show"
          {...register("query")}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-50 border bg-[#21293b] rounded-xl border-[#21293b]"
        />
      </div>
      {errors.query && (
        <p className="text-red-500 p-2">{errors.query.message}</p>
      )}
    </form>
  );
};
