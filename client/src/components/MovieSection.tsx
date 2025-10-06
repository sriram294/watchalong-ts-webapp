import axiosInstance from "@/lib/axios";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./MovieCard"; // adjust import
import { Movie } from "@/types/movie";
import { BACKEND_BASE } from "../config";
import axios from "axios";
interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onAddToWatchlist?: (movieId: number, title: string) => void;
  onAddToGroup?: (movie: Movie) => void;
}
export function MovieSection({ title, movies, onAddToWatchlist, onAddToGroup }: MovieSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 200; // estimate card width
      const scrollAmount = cardWidth * 6; // scroll by 6 cards
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-12">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-bold"
          data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scroll("left")}
            data-testid={`button-scroll-left-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scroll("right")}
            data-testid={`button-scroll-right-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scrollable movie list */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
      >
        {movies.map((movie: Movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[70%] sm:w-[40%] md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <MovieCard
              {...movie}
              onAddToWatchlist={() => onAddToWatchlist?.(movie.id, movie.title)}
              onAddToGroup={() => onAddToGroup?.(movie)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}