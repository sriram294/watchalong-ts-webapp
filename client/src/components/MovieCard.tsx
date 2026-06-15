import { Star, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string | null;
  rating: number;
  genre?: string;
  isWatchlistItem?: boolean;
  onAddToWatchlist?: (id: number, title: string) => void;
  onAddToGroup?: () => void;
}

export function MovieCard({
  id,
  title,
  posterUrl,
  rating,
  genre,
  isWatchlistItem,
  onAddToWatchlist,
  onAddToGroup,
}: MovieCardProps) {
  const imageUrl = posterUrl ?? 'https://via.placeholder.com/500x750?text=No+Poster';
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div
      className="wa-card cursor-pointer"
      data-testid={`card-movie-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => navigate(`/movie/${id}`)}
    >
      {/* Poster */}
      <div className="wa-poster relative aspect-[2/3] overflow-hidden mb-2.5">
        <img
          src={imageUrl}
          alt={title}
          className="wa-poster-img w-full h-full object-cover"
        />

        {/* Action buttons — appear on hover */}
        <div
          className={`wa-poster-ov absolute inset-0 bg-black/50 flex items-end justify-center gap-2 pb-3 ${
            isMobile ? '!opacity-100' : ''
          }`}
        >
          <Button
            size="sm"
            variant={isWatchlistItem ? "default" : "outline"}
            className="h-8 px-3 backdrop-blur-sm bg-background/70 border-white/20 hover:bg-background/90 text-white"
            onClick={e => { e.stopPropagation(); onAddToWatchlist?.(id, title); }}
            data-testid={`button-watchlist-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWatchlistItem ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 backdrop-blur-sm bg-background/70 border-white/20 hover:bg-background/90 text-white"
            onClick={e => { e.stopPropagation(); onAddToGroup?.(); }}
            data-testid={`button-add-group-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Info below poster */}
      <div>
        <h3
          className="font-semibold text-sm text-foreground line-clamp-1 mb-1"
          data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
          <span
            className="font-semibold text-foreground/80"
            data-testid={`badge-rating-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {rating.toFixed(1)}
          </span>
          {genre && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <span>{genre}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
