import type { NormalizedMovie, NormalizedMovieDetail } from '@/types/movie';
import { MOVIE_PROVIDER } from '../config';
import { TmdbProvider } from './providers/tmdb';
import { TraktProvider } from './providers/trakt';

export interface MovieProvider {
  search(query: string): Promise<NormalizedMovie[]>;
  getDetails(id: string | number): Promise<NormalizedMovieDetail>;
  getTrending(): Promise<NormalizedMovie[]>;
  getPopular(): Promise<NormalizedMovie[]>;
  getTopRated(): Promise<NormalizedMovie[]>;
  getUpcoming(): Promise<NormalizedMovie[]>;
}

export const movieProvider: MovieProvider =
  MOVIE_PROVIDER === 'trakt' ? new TraktProvider() : new TmdbProvider();
