import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "../api/interfaces";

interface CarouselProps {
  items: Search[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;

  const handlePrev = () => {
    const newIndex =
      currentIndex - itemsPerPage < 0
        ? items.length - (items.length % itemsPerPage)
        : currentIndex - itemsPerPage;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex + itemsPerPage >= items.length
        ? 0
        : currentIndex + itemsPerPage;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const itemWidth = (carouselRef.current.firstElementChild as HTMLElement)
        ?.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <button
        className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 border-none p-2 cursor-pointer left-2"
        onClick={handlePrev}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div
        className="flex overflow-x-scroll scroll-smooth hide-scrollbar"
        ref={carouselRef}
      >
        {items.map((item) => (
          <Link
            key={item.imdbID}
            to={`/movie/${item.imdbID}`}
            className="max-w-[250px] mx-5 flex-none transition-transform duration-500 ease"
          >
            <img
              src={item.Poster}
              alt={item.Title}
              className="w-full aspect-[10/14] object-cover hover:border hover:border-white"
            />
          </Link>
        ))}
      </div>

      <button
        className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 border-none p-2 cursor-pointer right-2"
        onClick={handleNext}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
