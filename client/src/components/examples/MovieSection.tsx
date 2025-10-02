import { MovieSection } from '../MovieSection';

export default function MovieSectionExample() {
  const mockMovies = [
    { id: 1, title: 'The Shawshank Redemption', posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', rating: 8.7 },
    { id: 2, title: 'The Dark Knight', posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', rating: 9.0 },
    { id: 3, title: 'Inception', posterPath: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', rating: 8.8 },
    { id: 4, title: 'Interstellar', posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.6 },
    { id: 5, title: 'The Matrix', posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', rating: 8.7 },
    { id: 6, title: 'Pulp Fiction', posterPath: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', rating: 8.9 },
  ];

  return (
    <div className="p-4">
      <MovieSection title="Trending Now" movies={mockMovies} />
    </div>
  );
}
