import { MovieCard } from "@/components/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Movie } from "@/types/movie";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onAddToWatchlist?: (movie: Movie) => void;
  onAddToGroup?: (movie: Movie) => void;
}


export function MovieSection({ title, movies, onAddToWatchlist, onAddToGroup }: MovieSectionProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h2>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => console.log('Scroll left')}
            data-testid={`button-scroll-left-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => console.log('Scroll right')}
            data-testid={`button-scroll-right-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex md:grid gap-4 overflow-x-auto md:overflow-x-visible md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-auto">
            <MovieCard
              {...movie}
              onAddToWatchlist={() => onAddToWatchlist?.(movie)}
              onAddToGroup={() => onAddToGroup?.(movie)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
