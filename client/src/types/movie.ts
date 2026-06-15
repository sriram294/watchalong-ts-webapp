export interface NormalizedMovie {
  id: number;
  title: string;
  posterUrl: string | null;
  rating: number;
  genre?: string;
}

export interface NormalizedMovieDetail extends NormalizedMovie {
  backdropUrl: string | null;
  releaseDate: string;
  runtime: number;
  overview: string;
  genres: { id: string | number; name: string }[];
  tagline?: string;
}

export interface Movie extends NormalizedMovie {
  upvotes?: number;
  downvotes?: number;
  userVote?: 'up' | 'down' | null;
  onVote?: (vote: 'up' | 'down') => void;
}
