import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "../config";
import { movieProvider } from "@/lib/movieProvider";
import type { NormalizedMovieDetail, NormalizedMovie } from "@/types/movie";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { MovieCard } from "@/components/MovieCard";
import { onAddToWatchlist } from "@/lib/watchlist";
import { fetchGroups, addMovieToGroups } from "@/lib/groups";
import { Bookmark, Share2, ThumbsUp, Plus, Star } from "lucide-react";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const [movie, setMovie] = useState<NormalizedMovieDetail | null>(null);
  const [similar, setSimilar] = useState<NormalizedMovie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<number[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([]);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setMovie(null);
    Promise.all([
      movieProvider.getDetails(id),
      axiosInstance.get(`${BACKEND_BASE}/api/watchlist`, { withCredentials: true }),
    ])
      .then(([movieDetail, watchlistRes]) => {
        setMovie(movieDetail);
        const ids = watchlistRes.data.movieIds || [];
        setWatchlistMovieIds(ids);
      })
      .catch(() => setError("Failed to fetch movie details."));

    movieProvider.getTrending().then(setSimilar).catch(() => {});
  }, [id]);

  if (error) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />

      {/* Backdrop header */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {movie?.backdropUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center wa-kenburns"
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-card" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, hsl(var(--background)) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
        />
      </div>

      {/* Main content — overlaps the backdrop bottom edge */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-8 -mt-32">

        {!movie ? (
          <div className="text-center py-20 text-muted-foreground">Loading...</div>
        ) : (
          <>
            {/* Type badge */}
            <span className="inline-block border border-white/30 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              Movie
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-2 leading-tight">
              {movie.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold">{movie.rating.toFixed(1)}</span>
              </span>
              {movie.runtime > 0 && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                </>
              )}
              {movie.releaseDate && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>{movie.releaseDate.slice(0, 4)}</span>
                </>
              )}
              {movie.genres.slice(0, 3).map((g, i) => (
                <span key={g.id} className="flex items-center gap-3">
                  <span className="text-gray-600">•</span>
                  {g.name}
                </span>
              ))}
            </div>

            {/* Primary buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => onAddToWatchlist(movie.id, movie.title, watchlistMovieIds)}
                className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition text-sm"
              >
                <Bookmark className={`w-4 h-4 ${watchlistMovieIds.includes(movie.id) ? 'fill-current' : ''}`} />
                {watchlistMovieIds.includes(movie.id) ? 'In Watchlist' : 'Add Watchlist'}
              </button>
              <button
                onClick={async () => { const g = await fetchGroups(); setGroups(g); setShowModal(true); }}
                className="flex items-center gap-2 bg-white/10 text-white font-semibold px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/15 active:scale-95 transition text-sm backdrop-blur-sm"
              >
                <Plus className="w-4 h-4" />
                Add to Group
              </button>
            </div>

            {/* Secondary buttons */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { icon: Share2, label: 'Share' },
                { icon: ThumbsUp, label: 'Like' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-1.5 bg-white/5 text-white/70 font-medium px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition text-xs"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Story Line */}
            <section className="mb-10">
              <h2 className="text-lg font-bold text-white mb-3">Story Line</h2>
              <p className={`text-gray-400 text-sm leading-relaxed ${overviewExpanded ? '' : 'line-clamp-4'}`}>
                {movie.overview}
              </p>
              {movie.overview && movie.overview.length > 300 && (
                <button
                  onClick={() => setOverviewExpanded(x => !x)}
                  className="text-primary text-sm font-medium mt-2 hover:underline"
                >
                  {overviewExpanded ? 'Less' : 'More'}
                </button>
              )}
            </section>

            {/* Genre pills */}
            {movie.genres.length > 0 && (
              <section className="mb-12">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(g => (
                    <span
                      key={g.id}
                      className="bg-white/5 border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Similar movies */}
            {similar.length > 0 && (
              <section className="mb-12">
                <h2 className="text-lg font-bold text-white mb-5">Similar Movies for you</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
                  {similar.filter(m => m.id !== movie.id).slice(0, 5).map(m => (
                    <MovieCard key={m.id} {...m} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Add to group modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl p-5 w-80">
            <h2 className="text-base font-bold mb-4">Add to Group</h2>
            <div className="max-h-52 overflow-y-auto mb-4 space-y-1">
              {groups.map(group => (
                <label key={group.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(group.id)}
                    onChange={() => setSelectedGroups(prev =>
                      prev.includes(group.id) ? prev.filter(id => id !== group.id) : [...prev, group.id]
                    )}
                    className="accent-primary"
                  />
                  <span className="text-sm">{group.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                Cancel
              </button>
              {movie && (
                <button
                  onClick={async () => { await addMovieToGroups(selectedGroups, movie.id, movie.title); setShowModal(false); setSelectedGroups([]); }}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
