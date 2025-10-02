import { GroupMovieCard } from '../GroupMovieCard';

export default function GroupMovieCardExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      <GroupMovieCard
        id={1}
        title="Interstellar"
        posterPath="/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
        rating={8.6}
        upvotes={12}
        downvotes={3}
        userVote="up"
      />
      <GroupMovieCard
        id={2}
        title="The Matrix"
        posterPath="/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
        rating={8.7}
        upvotes={8}
        downvotes={1}
      />
    </div>
  );
}
