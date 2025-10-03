import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { TMDB_API_KEY, BACKEND_BASE } from '../../../config';
import { Movie } from "@/types/movie";
import { Group } from "@/types/Group";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  //const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([])
  const selectedMovieRef = useRef<Movie | null>(null)

  const groups = [
    {
      id: '1',
      name: 'Movie Night Crew',
      memberCount: 8,
      movieCount: 12,
      members: [
        { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: '4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: '5', name: 'Eve Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
      ],
    },
    {
      id: '2',
      name: 'Sci-Fi Lovers',
      memberCount: 5,
      movieCount: 8,
      members: [
        { id: '6', name: 'Frank Miller', avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: '7', name: 'Grace Lee', avatar: 'https://i.pravatar.cc/150?img=7' },
        { id: '8', name: 'Henry Wilson', avatar: 'https://i.pravatar.cc/150?img=8' },
      ],
    },
    {
      id: '3',
      name: 'Classic Cinema Club',
      memberCount: 12,
      movieCount: 24,
      members: [
        { id: '9', name: 'Ivy Chen', avatar: 'https://i.pravatar.cc/150?img=9' },
        { id: '10', name: 'Jack Davis', avatar: 'https://i.pravatar.cc/150?img=10' },
        { id: '11', name: 'Kate Moore', avatar: 'https://i.pravatar.cc/150?img=11' },
        { id: '12', name: 'Liam Taylor', avatar: 'https://i.pravatar.cc/150?img=12' },
        { id: '13', name: 'Mia Anderson', avatar: 'https://i.pravatar.cc/150?img=13' },
      ],
    },
  ];
  
  const categories = [
    { title: "Trending Now", endpoint: `/trending/movie/week` },
    { title: "Popular", endpoint: `/movie/popular` },
    { title: "Top Rated", endpoint: `/movie/top_rated` },
    { title: "Upcoming", endpoint: `/movie/upcoming` }
  ];

  type MovieCategoryProps = {
  catTitle: string;
  endpoint: string;
};
const fetchGroups = async () => {
   try {
    const res = await axios.get(
      `${BACKEND_BASE}/api/groups/fetchGroups`,{withCredentials:true} // important for sending session cookies
    );

    // If we get here, we are logged in and have the data
    console.log(res.data);
    //setGroups(res.data || []);
    console.log('Fetched groups:', groups);

  } catch (err: any) {
    if (err.response && err.response.status === 302) {
      // Axios sees the redirect status — manually navigate to it
      window.location.href = err.response.headers.location;
    } else {
      console.error(err);
    }
  }
  }

  const handleAddToGroups = async () => {
    for (const groupId of selectedGroups) {
      try {
        await axios.post(`${BACKEND_BASE}/api/groups/${groupId}/add-movie`, selectedMovieRef.current, {withCredentials:true})
      } catch (e) {
        console.error(e)
      }
    }
    alert('Added to selected groups')
    setShowModal(false)
    setSelectedGroups([])
  }

  const handleGroupSelect = (groupId:any) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

const openGroupList = (movie:Movie) => {
    selectedMovieRef.current = movie
    fetchGroups()
    setShowModal(true)
  }

  const MovieCategory: React.FC<MovieCategoryProps> = ({ catTitle, endpoint }) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      axios
        .get(`https://api.themoviedb.org/3${endpoint}?api_key=${TMDB_API_KEY}`)
        .then((res) => setMovies(res.data.results.slice(0, 6)))
        .catch((err) => console.error(err));
    }, [endpoint]);
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <MovieSection 
          title={catTitle}
          movies={movies}
          onAddToWatchlist={(movie) => axios.post(`${BACKEND_BASE}/api/watchlist/add-movie`, { id:movie.id },{withCredentials:true})}
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
          <div className="shadcn-card rounded-xl border backdrop-blur-xl bg-background/30 border-card-border text-card-foreground shadow-sm p-4 hover-elevate active-elevate-2 cursor-pointer">
            <h2 className="text-lg font-bold mb-4">Select Groups</h2>
            <div className="max-h-60 overflow-y-auto mb-4">
              {groups.map(group => (
                <div className="p-1" key={group.id}>
                <label key={group.id} className="flex items-center mb-2">
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
      <BottomNav />
    </div>
  );
}
