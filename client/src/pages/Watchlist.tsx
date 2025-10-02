import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { BottomNav } from "@/components/BottomNav";

export default function Watchlist() {
  const watchlistMovies = [
    { id: 1, title: 'The Shawshank Redemption', posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', rating: 8.7 },
    { id: 2, title: 'The Dark Knight', posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', rating: 9.0 },
    { id: 3, title: 'Inception', posterPath: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', rating: 8.8 },
    { id: 4, title: 'Interstellar', posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.6 },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-watchlist-title">My Watchlist</h1>
          <p className="text-muted-foreground" data-testid="text-watchlist-count">
            {watchlistMovies.length} movies saved
          </p>
        </div>

        {watchlistMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlistMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
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
