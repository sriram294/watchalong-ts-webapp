import { Star, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  isWatchlistItem?: boolean;
  onAddToWatchlist?: (id: number) => void;
  onAddToGroup?: () => void;
}

export function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  isWatchlistItem,
  onAddToWatchlist,
  onAddToGroup
}: MovieCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';
  const navigate = useNavigate();

  const handleWatchlistClick = (movieid: number) => {
    setIsInWatchlist(!isInWatchlist);
    onAddToWatchlist?.(movieid);
    console.log('Watchlist toggled:', title);
  };

  const handleGroupClick = () => {
    onAddToGroup?.();
    console.log('Add to group:', title);
  };

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105 cursor-pointer"
      data-testid={`card-movie-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={handleCardClick}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        <Badge
          className="absolute top-2 right-2 gap-1 bg-background/80 backdrop-blur-sm border-border"
          data-testid={`badge-rating-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-xs font-semibold">{vote_average.toFixed(1)}</span>
        </Badge>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center gap-2 pb-4">
          <Button
            size="sm"
            variant={isWatchlistItem ? "default" : "outline"}
            className="backdrop-blur-sm bg-background/80 hover:bg-background/90"
            onClick={() => handleWatchlistClick(id)}
            data-testid={`button-watchlist-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Heart className={`w-4 h-4 ${isInWatchlist ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="backdrop-blur-sm bg-background/80 hover:bg-background/90"
            onClick={handleGroupClick}
            data-testid={`button-add-group-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2" data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
      </div>

      </div>

      
    </div>
  );
}
