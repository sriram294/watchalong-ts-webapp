import { useEffect, useState } from "react";
import axios from "axios";
import { TMDB_API_KEY } from "../../../config";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { onAddToWatchlist } from "@/lib/watchlist";
import { fetchGroups, addMovieToGroups } from "@/lib/groups";
import { Heart, Plus } from "lucide-react";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const [movie, setMovie] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<number[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: { api_key: TMDB_API_KEY },
      })
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch movie details.");
      });
    // Fetch watchlist IDs
    axios
      .get(`/api/watchlist`, { withCredentials: true })
      .then((res) => {
        const ids = res.data.movieIds || [];
        setWatchlistMovieIds(ids);
      })
      .catch(() => setWatchlistMovieIds([]));
  }, [id]);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {movie && movie.backdrop_path && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4) blur(2px)',
            }}
          />
        )}
        <div className="relative z-10">
          {error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : movie ? (
            <div className="flex flex-col md:flex-row gap-8 bg-card/80 rounded-xl shadow-lg p-8">
              <div className="flex flex-col items-center md:items-start md:w-1/3 relative">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined}
                  alt={movie.title}
                  className="rounded-lg shadow-lg mb-6 w-64 border-4 border-background"
                />
                <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  {movie.genres && movie.genres.map((g: any) => (
                    <span key={g.id} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">{g.name}</span>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">{movie.title}</h1>
                {movie.tagline && <p className="text-lg text-muted-foreground mb-2 italic">{movie.tagline}</p>}
                <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                    className="flex items-center gap-2 px-3 py-2 rounded-md transition hover-elevate active-elevate-2 border border-primary backdrop-blur-xl bg-background/50 text-primary font-medium"
                    onClick={() => onAddToWatchlist(movie.id, watchlistMovieIds)}
                  >
                    
                    <Heart className={`w-4 h-4 ${watchlistMovieIds.includes(movie.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-md transition hover-elevate active-elevate-2 border border-primary backdrop-blur-xl bg-background/50 text-primary font-medium"
                    onClick={async () => {
                      const groupList = await fetchGroups();
                      setGroups(groupList);
                      setShowModal(true);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 mt-4">
                  <div>
                    <span className="font-semibold">Release Date:</span>
                    <div>{movie.release_date}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Runtime:</span>
                    <div>{movie.runtime} min</div>
                  </div>
                  <div>
                    <span className="font-semibold">Rating:</span>
                    <div>{movie.vote_average} / 10</div>
                  </div>
                </div>
                <p className="mb-4 text-base leading-relaxed text-white/90"><span className="font-semibold">Overview:</span> {movie.overview}</p>
              </div>
              
            </div>
          ) : (
            <p className="text-center">Movie not found.</p>
          )}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="shadcn-card rounded-xl border backdrop-blur-xl bg-background/30 border-card-border text-card-foreground shadow-sm p-4 cursor-pointer">
                <h2 className="text-lg font-bold mb-4">Select Groups</h2>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {groups.map(group => (
                    <div className="p-1" key={group.id}>
                      <label key={group.id} className="flex items-center mb-2 ">
                        <input
                          type="checkbox"
                          checked={selectedGroups.includes(group.id)}
                          onChange={() => setSelectedGroups(prev => prev.includes(group.id) ? prev.filter(id => id !== group.id) : [...prev, group.id])}
                          className="mr-2"
                        />
                        {group.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-8 rounded-md px-3 text-xs"
                    onClick={async () => {
                      await addMovieToGroups(selectedGroups, movie);
                      alert('Added to selected groups');
                      setShowModal(false);
                      setSelectedGroups([]);
                    }}
                  >
                    Add
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-8 rounded-md px-3 text-xs"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
