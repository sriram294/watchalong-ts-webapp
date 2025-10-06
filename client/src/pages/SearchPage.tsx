import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";
import { BACKEND_BASE, TMDB_API_KEY } from "../config";
import axios from "axios";
import { HeroSection } from "@/components/HeroSection";
import { Movie } from "@/types/movie";
import { fetchGroups as sharedFetchGroups, addMovieToGroups as sharedAddMovieToGroups } from "@/lib/groups";
import { onAddToWatchlist as sharedOnAddToWatchlist } from "@/lib/watchlist";



export default function SearchPage() {
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const selectedMovieRef = useState<Movie | null>(null);
  // Fetch watchlist IDs on mount
  useState(() => {
    axios.get(`${BACKEND_BASE}/api/watchlist`).then(res => {
      const ids = res.data.movieIds || [];
      setWatchlistMovieIds(ids);
    });
  }, []);
  const onAddToWatchlist = (movieId: number) => {
    sharedOnAddToWatchlist(movieId, watchlistMovieIds);
  };

  const fetchGroups = async () => {
    const groupsData = await sharedFetchGroups();
    setGroups(groupsData);
  };

  const openGroupList = (movie: Movie) => {
    selectedMovieRef[1](movie);
    fetchGroups();
    setShowModal(true);
  };

  const handleAddToGroups = async () => {
    if (selectedMovieRef[0]) {
      await sharedAddMovieToGroups(selectedGroups, selectedMovieRef[0]);
      setShowModal(false);
      setSelectedGroups([]);
    }
  };

  const handleGroupSelect = (groupId: any) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };
  const [searchResults, setSearchResults] = useState<Movie[]>([]);


  const searchMovies = async (query : string) => {
try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1&api_key=${TMDB_API_KEY}` // important for sending session cookies
      );

     setSearchResults( (res.data.results || []).filter((movie: any) => movie.original_language === "en") );
      console.log(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
    window.location.href = `${BACKEND_BASE}/oauth2/authorization/google`;
  }
    }
  
}


  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6" data-testid="text-search-title">Search Movies</h1>
          <SearchBar onSearch={searchMovies} />
        </div>

        <div className="mt-8">
          <p className="text-muted-foreground mb-4" data-testid="text-results-count">
            {searchResults.length} results found
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onAddToWatchlist={() => onAddToWatchlist(movie.id)}
                onAddToGroup={() => openGroupList(movie)}
              />
            ))}
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
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
