import axiosInstance from "@/lib/axios";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { BottomNav } from "@/components/BottomNav";
import { TMDB_API_KEY, BACKEND_BASE } from '../config';
import axios from "axios";
import { fetchGroups as sharedFetchGroups, addMovieToGroups as sharedAddMovieToGroups } from "@/lib/groups";
import { onAddToWatchlist as sharedOnAddToWatchlist } from "@/lib/watchlist";
import { useEffect, useRef, useState } from "react";
import { Movie } from "@/types/movie";
import { Group } from "@/types/group";

export default function Watchlist() {
 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([])
  const selectedMovieRef = useRef<Movie | null>(null)
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    // Fetch watchlist IDs and then fetch movie details
    const fetchWatchlistAndMovies = async () => {
      try {
        const res = await axiosInstance.get(`${BACKEND_BASE}/api/watchlist`);
        // Expecting response: [{ id: "1218925", title: "..." }, ...]
        const items: { id: string | number; title: string }[] = res.data || [];
        const ids: number[] = items?.map(item => Number(item.id));
        setWatchlistMovieIds(ids);

        if (ids.length > 0) {
          // Fetch details for each movie ID in parallel
          const moviePromises = ids.map((id: number) =>
            axiosInstance.get(`https://api.themoviedb.org/3/movie/${id}`, {
              params: { api_key: TMDB_API_KEY },
            })
          );
          const movieDetails = await Promise.all(moviePromises);
          setMovies(movieDetails.map(res => res.data));
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching watchlist or movie details:', error);
        setMovies([]);
      }
    };

    fetchWatchlistAndMovies();
  }, []);


  const onAddToWatchlist = (movieId: number, title: string) => {
    sharedOnAddToWatchlist(movieId, title, watchlistMovieIds);
  }

  const fetchGroups = async () => {
    const groupsData = await sharedFetchGroups();
    setGroups(groupsData);
    console.log('Fetched groups:', groupsData);
  }

  const handleAddToGroups = async () => {
    if (selectedMovieRef.current) {
      await sharedAddMovieToGroups(selectedGroups, selectedMovieRef.current.id, selectedMovieRef.current.title);
      alert('Added to selected groups');
      setShowModal(false);
      setSelectedGroups([]);
    }
  }


  const handleGroupSelect = (groupId: any) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const openGroupList = (movie: Movie) => {
    selectedMovieRef.current = movie
    fetchGroups()
    setShowModal(true)
  }


  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-watchlist-title">My Watchlist</h1>
          <p className="text-muted-foreground" data-testid="text-watchlist-count">
            {movies.length} movies saved
          </p>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                isWatchlistItem={true}
                onAddToWatchlist={onAddToWatchlist}
                onAddToGroup={() => openGroupList(movie)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Your watchlist is empty</p>
            <p className="text-muted-foreground mt-2">Start adding movies to watch later!</p>
          </div>
        )}
      </div>
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
                      onChange={() => handleGroupSelect(group.id)}
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
                onClick={() => console.log('Create group')} data-testid="button-create-group"
              >
                Create Group
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-8 rounded-md px-3 text-xs"
                onClick={handleAddToGroups}
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
      <BottomNav />
    </div>
  );
}
