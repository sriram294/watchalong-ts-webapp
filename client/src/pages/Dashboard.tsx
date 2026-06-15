import axiosInstance from "@/lib/axios";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { CreateGroupModal } from "@/components/CreateGroupModal";
import { fetchGroups as sharedFetchGroups, addMovieToGroups as sharedAddMovieToGroups } from "@/lib/groups";
import { onAddToWatchlist as sharedOnAddToWatchlist } from "@/lib/watchlist";
import { BACKEND_BASE } from '../config';
import { movieProvider } from "@/lib/movieProvider";
import type { NormalizedMovie } from "@/types/movie";
import { Group } from "@/types/group";

type MovieCategoryProps = {
  catTitle: string;
  fetcher: () => Promise<NormalizedMovie[]>;
  onAddToWatchlist: (movieId: number, title: string) => void;
  onAddToGroup: (movie: NormalizedMovie) => void;
};

const MovieCategory: React.FC<MovieCategoryProps> = ({ catTitle, fetcher, onAddToWatchlist, onAddToGroup }) => {
  const [movies, setMovies] = useState<NormalizedMovie[]>([]);
  useEffect(() => {
    fetcher().then(setMovies).catch(console.error);
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <MovieSection
        title={catTitle}
        movies={movies}
        onAddToWatchlist={onAddToWatchlist}
        onAddToGroup={onAddToGroup}
      />
    </div>
  );
};

export default function Dashboard() {
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([])
  const selectedMovieRef = useRef<NormalizedMovie | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [createGroupError, setCreateGroupError] = useState<string | null>(null);

  const handleCreateGroup = async (groupName: string) => {
    setCreatingGroup(true);
    setCreateGroupError(null);
    try {
      const { createGroup } = await import("@/lib/createGroup");
      await createGroup(groupName);
      setShowCreateGroupModal(false);
      fetchGroups();
    } catch (err) {
      setCreateGroupError("Failed to create group");
    } finally {
      setCreatingGroup(false);
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axiosInstance.get(`${BACKEND_BASE}/api/watchlist`);
        const items: { id: string | number; title: string }[] = res.data || [];
        const ids: number[] = items?.map(item => Number(item.id));
        setWatchlistMovieIds(ids);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    fetchWatchlist();
  }, []);

  const categories = [
    { title: "Popular of the Week", fetcher: () => movieProvider.getTrending() },
    { title: "Just Release", fetcher: () => movieProvider.getPopular() },
    { title: "Top Rated", fetcher: () => movieProvider.getTopRated() },
    { title: "Your Watchlist", fetcher: () => movieProvider.getUpcoming() },
  ];

  const onAddToWatchlist = (movieId: number, title: string) => {
    sharedOnAddToWatchlist(movieId, title, watchlistMovieIds);
  }

  const fetchGroups = async () => {
    const groupsData = await sharedFetchGroups();
    setGroups(groupsData);
  }

  const handleAddToGroups = async () => {
    if (selectedMovieRef.current) {
      await sharedAddMovieToGroups(selectedGroups, selectedMovieRef.current.id, selectedMovieRef.current.title);
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

  const openGroupList = (movie: NormalizedMovie) => {
    selectedMovieRef.current = movie
    fetchGroups()
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <HeroSection onAddToWatchlist={onAddToWatchlist} onAddToGroup={openGroupList} />
      {categories.map((cat) => (
        <MovieCategory
          key={cat.title}
          catTitle={cat.title}
          fetcher={cat.fetcher}
          onAddToWatchlist={onAddToWatchlist}
          onAddToGroup={openGroupList}
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
                onClick={() => setShowCreateGroupModal(true)} data-testid="button-create-group"
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
      <CreateGroupModal
        open={showCreateGroupModal}
        onClose={() => { setShowCreateGroupModal(false); setCreateGroupError(null); }}
        onCreate={handleCreateGroup}
        loading={creatingGroup}
        error={createGroupError}
      />
      <Footer />
      <BottomNav />
    </div>
  );
}
