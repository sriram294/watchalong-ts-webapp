import { MovieCard } from "@/components/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onAddToWatchlist?: (movieId: number) => void;
  onAddToGroup?: (movieId: number) => void;
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            onAddToWatchlist={() => onAddToWatchlist?.(movie.id)}
            onAddToGroup={() => onAddToGroup?.(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
