import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { BottomNav } from "@/components/BottomNav";
import { TMDB_API_KEY, BACKEND_BASE } from '../../../config';
import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";

export default function Watchlist() {
  type WatchlistItem = {
  id: string | number;
  // Add other properties as needed, e.g. title, poster, etc.
};
   const [items, setItems] = useState<Movie[]>([])

  useEffect(()=>{
    async function load(){
      try{
        const res = await axios.get(`${BACKEND_BASE}/api/watchlist`,{withCredentials:true})
        const watchlist = res.data;
        const movieIds = watchlist.movieIds || [];
        const validIds = movieIds
          .map((id: any) => {
            if (typeof id === "string") {
              try {
                const parsed = JSON.parse(id);
                return parsed.id || id;
              } catch {
                return id;
              }
            }
            if (typeof id === "object" && id.id) return id.id;
            return id;
          })
          .filter(Boolean);

        const movies: Movie[] = [];
        for (const id of validIds) {
          try {
            const tmdbRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
            );
            movies.push(tmdbRes.data);
          } catch (err) {
            // Optionally handle error for individual movie fetch
          }
        }
        setItems(movies);
      }catch(e){
        console.error(e)
      }
    }
    load()
  },[])

  const removeItem = async (movieId:string | number) => {
    try{
      await axios.post(`${BACKEND_BASE}/api/watchlist/remove`, { movieId },{withCredentials:true})
      setItems(items.filter(i => i.id !== movieId))
    }catch(e){
      alert('Remove failed (placeholder)')
    }
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-watchlist-title">My Watchlist</h1>
          <p className="text-muted-foreground" data-testid="text-watchlist-count">
            {items.length} movies saved
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                isWatchlistItem={true}
                onAddToWatchlist={() => console.log('Remove from watchlist:', movie.id)}
                onAddToGroup={() => console.log('Add to group:', movie.id)}
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

      <BottomNav />
    </div>
  );
}
