import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./MovieCard";
import { NormalizedMovie } from "@/types/movie";

interface MovieSectionProps {
  title: string;
  movies: NormalizedMovie[];
  onAddToWatchlist?: (movieId: number, title: string) => void;
  onAddToGroup?: (movie: NormalizedMovie) => void;
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
    <div className="mb-8">
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
        className="wa-rail-track flex gap-4 overflow-x-auto px-4 scrollbar-hide"
        style={{ paddingTop: '22px', paddingBottom: '26px', marginTop: '-16px', marginBottom: '-8px' }}
      >
        {movies.map((movie: NormalizedMovie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[70%] sm:w-[40%] md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <MovieCard
              {...movie}
              onAddToWatchlist={onAddToWatchlist}
              onAddToGroup={() => onAddToGroup?.(movie)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}