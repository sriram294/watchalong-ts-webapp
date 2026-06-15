import { useEffect, useState } from "react";
import { Bookmark, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { movieProvider } from "@/lib/movieProvider";
import type { NormalizedMovie, NormalizedMovieDetail } from "@/types/movie";

const FALLBACK_BACKDROP = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80';

const STREAMING_LOGOS = [
  { name: 'Disney+', style: 'text-blue-400 font-black italic' },
  { name: 'NETFLIX', style: 'text-red-500 font-black tracking-widest' },
  { name: 'HBO max', style: 'text-purple-400 font-bold' },
  { name: 'PIXAR', style: 'text-white/70 font-black tracking-wider' },
  { name: 'MARVEL', style: 'text-red-600 font-black tracking-widest' },
  { name: 'STAR WARS', style: 'text-yellow-400/80 font-bold tracking-widest text-xs' },
];

interface HeroSectionProps {
  onAddToWatchlist?: (id: number, title: string) => void;
  onAddToGroup?: (movie: NormalizedMovie) => void;
}

export function HeroSection({ onAddToWatchlist, onAddToGroup }: HeroSectionProps) {
  const [movie, setMovie] = useState<NormalizedMovieDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    movieProvider.getTrending()
      .then(movies => movies.length > 0 ? movieProvider.getDetails(movies[0].id) : null)
      .then(detail => detail && setMovie(detail))
      .catch(console.error);
  }, []);

  const backdropUrl = movie?.backdropUrl ?? FALLBACK_BACKDROP;

  const handleAddToWatchlist = () => {
    if (!movie) return;
    if (onAddToWatchlist) {
      onAddToWatchlist(movie.id, movie.title);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  const handleAddToGroup = () => {
    if (!movie) return;
    if (onAddToGroup) {
      onAddToGroup(movie);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div className="relative" style={{ isolation: 'isolate' }}>
      {/* Ambient artwork bleed — hero colour washing down into the page */}
      <div
        className="wa-ambient"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Hero */}
      <div className="relative h-[62vh] md:h-[75vh] overflow-hidden">
        {/* Backdrop with Ken Burns drift */}
        <div
          className="absolute inset-0 bg-cover bg-center wa-kenburns"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.1) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)' }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-14 px-6 md:px-16 max-w-7xl mx-auto w-full">
          <div className="max-w-xl">
            {/* Type badge */}
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              {movie ? 'Trending' : 'Featured'}
            </span>

            {/* Title */}
            <h1
              className="font-display font-black text-white leading-none mb-3"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
              data-testid="text-hero-title"
            >
              {movie?.title ?? 'Loading...'}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400 mb-4">
              {movie?.releaseDate && (
                <span>{movie.releaseDate.slice(0, 4)}</span>
              )}
              {movie?.genres.slice(0, 3).map((g, i) => (
                <span key={g.id} className="flex items-center gap-2">
                  {i > 0 || movie.releaseDate ? <span className="text-gray-600">•</span> : null}
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            {movie?.overview && (
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-7 max-w-md">
                {movie.overview}
              </p>
            )}

            {/* CTA buttons — Add Watchlist (primary) + Add to Group (glass) */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToWatchlist}
                className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition text-sm"
              >
                <Bookmark className="w-4 h-4" />
                Add Watchlist
              </button>
              <button
                onClick={handleAddToGroup}
                className="flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/15 active:scale-95 transition backdrop-blur-sm text-sm"
              >
                <Plus className="w-4 h-4" />
                Add to Group
              </button>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-14 right-6 md:right-16 flex items-center gap-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`rounded-full transition-all ${i === 0 ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-white/25'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Streaming logos strip */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center justify-between overflow-x-auto scrollbar-hide gap-6">
          {STREAMING_LOGOS.map(logo => (
            <span key={logo.name} className={`whitespace-nowrap text-sm ${logo.style} opacity-70 hover:opacity-100 transition-opacity cursor-default`}>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
