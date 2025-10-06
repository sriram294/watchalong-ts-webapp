import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "../config";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Member {
  id: string | number;
  name: string;
  avatar?: string;
}

interface GroupMovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  upvotes: number;
  downvotes: number;
  upvotedMembers: Member[];
  downvotedMembers: Member[];
}

export default function GroupMovieDetail() {
  const params = useParams<{ groupId: string; movieId: string }>();
  const groupId = params.groupId;
  const movieId = params.movieId;
  const [movie, setMovie] = useState<GroupMovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${BACKEND_BASE}/api/groups/${groupId}/movie/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        setError("Failed to load group movie details.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetail();
  }, [groupId, movieId]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img src={imageUrl} alt={movie.title} className="rounded-lg w-full" />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
            <Badge className="gap-1 bg-background/80 backdrop-blur-sm border-border w-fit">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
            </Badge>
            <div className="flex gap-4 mt-2">
              <Button size="sm" variant="default" className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 fill-current" />
                <span>{movie.upvotes} Upvotes</span>
              </Button>
              <Button size="sm" variant="destructive" className="flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 fill-current" />
                <span>{movie.downvotes} Downvotes</span>
              </Button>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Upvoted Members</h2>
              <div className="flex flex-wrap gap-2">
                {movie.upvotedMembers.length === 0 ? (
                  <span className="text-muted-foreground text-sm">No upvotes yet.</span>
                ) : (
                  movie.upvotedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 px-2 py-1 bg-background/60 rounded shadow">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{member.name[0]}</span>
                      )}
                      <span className="text-sm">{member.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Downvoted Members</h2>
              <div className="flex flex-wrap gap-2">
                {movie.downvotedMembers.length === 0 ? (
                  <span className="text-muted-foreground text-sm">No downvotes yet.</span>
                ) : (
                  movie.downvotedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 px-2 py-1 bg-background/60 rounded shadow">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{member.name[0]}</span>
                      )}
                      <span className="text-sm">{member.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
