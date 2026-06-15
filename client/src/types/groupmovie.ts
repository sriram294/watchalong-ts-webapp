export interface GroupMovie {
  id: number;
  movieId: number;
  title: string;
  movie: {
    id: string;
    title: string;
  };
  posterUrl: string | null;
  rating: number;
  upvotedByNames: string[];
  downvotedByNames: string[];
  upvotedBy?: string[];
  downvotedBy?: string[];
  reviews: any[];
}
