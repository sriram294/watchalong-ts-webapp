import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "../config";
import { movieProvider } from "@/lib/movieProvider";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GroupMovie } from "@/types/groupmovie";

export default function GroupMovieDetail() {
  const params = useParams<{ groupId: number | string; movieId: number | string }>();
  const groupId = params.groupId;
  const movieId = params.movieId;
  const [groupMovie, setGroupMovie] = useState<GroupMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${BACKEND_BASE}/api/groups/${groupId}/movie/${movieId}`);
        const groupMovieData: GroupMovie = res.data;

        let posterUrl: string | null = null;
        let rating = 0;
        try {
          const detail = await movieProvider.getDetails(groupMovieData.movieId);
          posterUrl = detail.posterUrl;
          rating = detail.rating;
        } catch {
          // leave defaults
        }

        setGroupMovie({ ...groupMovieData, posterUrl, rating });
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
  if (!groupMovie) return null;

  const imageUrl = groupMovie.posterUrl ?? 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img src={imageUrl} alt={groupMovie.title} className="rounded-lg w-full" />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-2">{groupMovie.title}</h1>
            <Badge className="gap-1 bg-background/80 backdrop-blur-sm border-border w-fit">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold">{groupMovie.rating?.toFixed(1)}</span>
            </Badge>
            <div className="flex gap-4 mt-2">
              <Button size="sm" variant="default" className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 fill-current" />
                <span>{groupMovie.upvotedByNames.length} Upvotes</span>
              </Button>
              <Button size="sm" variant="destructive" className="flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 fill-current" />
                <span>{groupMovie.downvotedByNames.length} Downvotes</span>
              </Button>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Upvoted Members</h2>
              <div className="flex flex-wrap gap-2">
                {groupMovie.upvotedByNames.length === 0 ? (
                  <span className="text-muted-foreground text-sm">No upvotes yet.</span>
                ) : (
                  groupMovie.upvotedByNames.map((member, idx) => (
                    <div key={member + '-' + idx} className="flex items-center gap-2 px-2 py-1 bg-background/60 rounded shadow">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{member[0]}</span>
                      <span className="text-sm">{member}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Downvoted Members</h2>
              <div className="flex flex-wrap gap-2">
                {groupMovie.downvotedByNames.length === 0 ? (
                  <span className="text-muted-foreground text-sm">No downvotes yet.</span>
                ) : (
                  groupMovie.downvotedByNames.map((member, idx) => (
                    <div key={member + '-' + idx} className="flex items-center gap-2 px-2 py-1 bg-background/60 rounded shadow">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{member[0]}</span>
                      <span className="text-sm">{member}</span>
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
