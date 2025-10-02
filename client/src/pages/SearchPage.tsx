import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";

export default function SearchPage() {
  const [searchResults] = useState([
    { id: 1, title: 'The Shawshank Redemption', posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', rating: 8.7 },
    { id: 2, title: 'The Dark Knight', posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', rating: 9.0 },
    { id: 3, title: 'Inception', posterPath: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', rating: 8.8 },
  ]);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6" data-testid="text-search-title">Search Movies</h1>
          <SearchBar onSearch={(q) => console.log('Searching:', q)} />
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
                onAddToWatchlist={() => console.log('Add to watchlist:', movie.id)}
                onAddToGroup={() => console.log('Add to group:', movie.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
