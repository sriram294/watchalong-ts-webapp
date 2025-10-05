import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { fetchGroups as sharedFetchGroups, addMovieToGroups as sharedAddMovieToGroups } from "@/lib/groups";
import { onAddToWatchlist as sharedOnAddToWatchlist } from "@/lib/watchlist";
import { TMDB_API_KEY, BACKEND_BASE } from '../../../config';
import { Movie } from "@/types/movie";
import { Group } from "@/types/group";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([])
  const selectedMovieRef = useRef<Movie | null>(null)
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE}/api/watchlist`, { withCredentials: true });
        const movieIds = (res.data.movieIds || []).map((id: string) => Number(id));
        setWatchlistMovieIds(movieIds);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    fetchWatchlist();
  }, []);


  const categories = [
    { title: "Trending Now", endpoint: `/trending/movie/week` },
    { title: "Popular", endpoint: `/movie/popular` },
    { title: "Top Rated", endpoint: `/movie/top_rated` },
    { title: "Upcoming", endpoint: `/movie/upcoming` }
  ];

    const onAddToWatchlist = (movieId: number) => {
      sharedOnAddToWatchlist(movieId, watchlistMovieIds);
    }

  type MovieCategoryProps = {
    catTitle: string;
    endpoint: string;
  };
  const fetchGroups = async () => {
    const groupsData = await sharedFetchGroups();
    setGroups(groupsData);
    console.log('Fetched groups:', groupsData);
  }

  const handleAddToGroups = async () => {
    if (selectedMovieRef.current) {
      await sharedAddMovieToGroups(selectedGroups, selectedMovieRef.current);
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



  const MovieCategory: React.FC<MovieCategoryProps> = ({ catTitle, endpoint }) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      axios
        .get(`https://api.themoviedb.org/3${endpoint}?api_key=${TMDB_API_KEY}`)
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.error(err));
    }, [endpoint]);
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <MovieSection
          title={catTitle}
          movies={movies}
          onAddToWatchlist={onAddToWatchlist}
          onAddToGroup={openGroupList}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <HeroSection />
      {categories.map((cat, idx) => (
        <MovieCategory key={idx} catTitle={cat.title} endpoint={cat.endpoint} />
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
