export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  onVote?: (vote: 'up' | 'down') => void;
}
