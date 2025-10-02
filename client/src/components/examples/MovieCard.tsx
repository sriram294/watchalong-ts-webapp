import { MovieCard } from '../MovieCard';

export default function MovieCardExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      <MovieCard
        id={1}
        title="The Shawshank Redemption"
        posterPath="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
        rating={8.7}
      />
      <MovieCard
        id={2}
        title="The Dark Knight"
        posterPath="/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
        rating={9.0}
      />
      <MovieCard
        id={3}
        title="Inception"
        posterPath="/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
        rating={8.8}
      />
    </div>
  );
}
