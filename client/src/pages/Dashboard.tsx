import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieSection } from "@/components/MovieSection";
import { BottomNav } from "@/components/BottomNav";

export default function Dashboard() {
  const trendingMovies = [
    { id: 1, title: 'The Shawshank Redemption', posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', rating: 8.7 },
    { id: 2, title: 'The Dark Knight', posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', rating: 9.0 },
    { id: 3, title: 'Inception', posterPath: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', rating: 8.8 },
    { id: 4, title: 'Interstellar', posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.6 },
    { id: 5, title: 'The Matrix', posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', rating: 8.7 },
    { id: 6, title: 'Pulp Fiction', posterPath: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', rating: 8.9 },
  ];

  const popularMovies = [
    { id: 7, title: 'Fight Club', posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', rating: 8.8 },
    { id: 8, title: 'Forrest Gump', posterPath: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', rating: 8.8 },
    { id: 9, title: 'The Godfather', posterPath: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', rating: 9.2 },
    { id: 10, title: 'Goodfellas', posterPath: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg', rating: 8.7 },
    { id: 11, title: 'The Silence of the Lambs', posterPath: '/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg', rating: 8.6 },
    { id: 12, title: 'Schindler\'s List', posterPath: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg', rating: 9.0 },
  ];

  const topRatedMovies = [
    { id: 13, title: 'The Green Mile', posterPath: '/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg', rating: 8.6 },
    { id: 14, title: 'The Prestige', posterPath: '/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg', rating: 8.5 },
    { id: 15, title: 'Gladiator', posterPath: '/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', rating: 8.5 },
    { id: 16, title: 'The Departed', posterPath: '/nT97ifVT2J1yMQmeq20Qblg61T.jpg', rating: 8.5 },
    { id: 17, title: 'Whiplash', posterPath: '/7fn624j5lj3xTme2SgiLCeuedmO.jpg', rating: 8.5 },
    { id: 18, title: 'The Pianist', posterPath: '/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg', rating: 8.5 },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <MovieSection 
          title="Trending Now" 
          movies={trendingMovies}
          onAddToWatchlist={(id) => console.log('Add to watchlist:', id)}
          onAddToGroup={(id) => console.log('Add to group:', id)}
        />
        
        <MovieSection 
          title="Popular" 
          movies={popularMovies}
          onAddToWatchlist={(id) => console.log('Add to watchlist:', id)}
          onAddToGroup={(id) => console.log('Add to group:', id)}
        />
        
        <MovieSection 
          title="Top Rated" 
          movies={topRatedMovies}
          onAddToWatchlist={(id) => console.log('Add to watchlist:', id)}
          onAddToGroup={(id) => console.log('Add to group:', id)}
        />
      </div>

      <BottomNav />
    </div>
  );
}
