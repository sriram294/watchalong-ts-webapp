import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import type { MovieProvider } from '../movieProvider';
import type { NormalizedMovie, NormalizedMovieDetail } from '@/types/movie';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

const GENRE_MAP: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
};

function toPosterUrl(path: string | null): string | null {
  return path ? `${IMG_BASE}/w500${path}` : null;
}

function toBackdropUrl(path: string | null): string | null {
  return path ? `${IMG_BASE}/original${path}` : null;
}

function normalizeMovie(m: any): NormalizedMovie {
  const firstGenreId: number | undefined = m.genre_ids?.[0];
  return {
    id: m.id,
    title: m.title,
    posterUrl: toPosterUrl(m.poster_path),
    rating: m.vote_average ?? 0,
    genre: firstGenreId ? GENRE_MAP[firstGenreId] : undefined,
  };
}

function normalizeDetail(m: any): NormalizedMovieDetail {
  return {
    id: m.id,
    title: m.title,
    posterUrl: toPosterUrl(m.poster_path),
    backdropUrl: toBackdropUrl(m.backdrop_path),
    rating: m.vote_average ?? 0,
    releaseDate: m.release_date ?? '',
    runtime: m.runtime ?? 0,
    overview: m.overview ?? '',
    genres: (m.genres ?? []).map((g: any) => ({ id: g.id, name: g.name })),
    tagline: m.tagline,
  };
}

async function fetchList(endpoint: string): Promise<NormalizedMovie[]> {
  const res = await axios.get(`${TMDB_BASE}${endpoint}`, {
    params: { api_key: TMDB_API_KEY },
  });
  return (res.data.results ?? []).map(normalizeMovie);
}

export class TmdbProvider implements MovieProvider {
  async search(query: string): Promise<NormalizedMovie[]> {
    const res = await axios.get(`${TMDB_BASE}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query, include_adult: true, language: 'en-US', page: 1 },
    });
    return (res.data.results ?? [])
      .filter((m: any) => m.original_language === 'en')
      .map(normalizeMovie);
  }

  async getDetails(id: string | number): Promise<NormalizedMovieDetail> {
    const res = await axios.get(`${TMDB_BASE}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    return normalizeDetail(res.data);
  }

  getTrending = () => fetchList('/trending/movie/week');
  getPopular = () => fetchList('/movie/popular');
  getTopRated = () => fetchList('/movie/top_rated');
  getUpcoming = () => fetchList('/movie/upcoming');
}
