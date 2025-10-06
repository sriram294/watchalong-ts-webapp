import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "@/config";

interface GroupMovieCardProps {
  id: number;
  groupId: string;
  title: string;
  poster_path: string | null;
  vote_average: number;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  onVote?: (vote: 'up' | 'down') => void;
}

export function GroupMovieCard({ 
  id,
  groupId,
  title, 
  poster_path, 
  vote_average, 
  upvotes: initialUpvotes, 
  downvotes: initialDownvotes,
  userVote: initialUserVote,
  onVote 
}: GroupMovieCardProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(initialUserVote || null);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const handleVote = (vote: boolean) => {
    // vote: true for upvote, false for downvote
    const movieId = String(id);
    const upvote = vote;
    axiosInstance.post(`${BACKEND_BASE}/api/groups/${groupId}/vote`, null, {
      params: { movieId, upvote },
    })
      .then(() => {
        // Update local state for instant feedback
        if (userVote === (upvote ? 'up' : 'down')) {
          if (upvote) setUpvotes(upvotes - 1);
          else setDownvotes(downvotes - 1);
          setUserVote(null);
        } else {
          if (userVote === 'up') setUpvotes(upvotes - 1);
          if (userVote === 'down') setDownvotes(downvotes - 1);
          if (upvote) setUpvotes(upvotes + 1);
          else setDownvotes(downvotes + 1);
          setUserVote(upvote ? 'up' : 'down');
        }
        onVote?.(upvote ? 'up' : 'down');
      })
      .catch(err => {
        // Optionally show error toast
        console.error(err);
      });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg" data-testid={`card-group-movie-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-[2/3] relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        <Badge 
          className="absolute top-2 right-2 gap-1 bg-background/80 backdrop-blur-sm border-border"
          data-testid={`badge-movie-rating-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-xs font-semibold">{vote_average.toFixed(1)}</span>
        </Badge>
      </div>
      
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2" data-testid={`text-movie-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={userVote === 'up' ? 'default' : 'outline'}
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); handleVote(true); }}
            data-testid={`button-upvote-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <ThumbsUp className={`w-4 h-4 ${userVote === 'up' ? 'fill-current' : ''}`} />
            <span className="ml-1 text-xs" data-testid={`text-upvotes-${title.toLowerCase().replace(/\s+/g, '-')}`}>{upvotes}</span>
          </Button>
          <Button
            size="sm"
            variant={userVote === 'down' ? 'destructive' : 'outline'}
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); handleVote(false); }}
            data-testid={`button-downvote-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <ThumbsDown className={`w-4 h-4 ${userVote === 'down' ? 'fill-current' : ''}`} />
            <span className="ml-1 text-xs" data-testid={`text-downvotes-${title.toLowerCase().replace(/\s+/g, '-')}`}>{downvotes}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
