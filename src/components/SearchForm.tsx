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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search for a movie or TV show"
          {...register("query")}
          className="p-2 border border-gray-300 rounded-xl w-64 lg:w-96"
        />
        <button type="submit" className="bg-gray-700 p-2 text-white rounded-xl">
          Search
        </button>
      </div>
      {errors.query && (
        <p className="text-red-500 p-2">{errors.query.message}</p>
      )}
    </form>
  );
};
