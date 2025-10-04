import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";
import { BACKEND_BASE, TMDB_API_KEY } from "../../../config";
import axios from "axios";
import { HeroSection } from "@/components/HeroSection";
import { Movie } from "@/types/movie";



export default function SearchPage() {
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
