import axios from 'axios';
import { TRAKT_CLIENT_ID, FANART_API_KEY } from '../../config';
import type { MovieProvider } from '../movieProvider';
import type { NormalizedMovie, NormalizedMovieDetail } from '@/types/movie';

const TRAKT_BASE = 'https://api.trakt.tv';
const FANART_BASE = 'https://webservice.fanart.tv/v3';

const traktHeaders = {
  'Content-Type': 'application/json',
  'trakt-api-version': '2',
  'trakt-api-key': TRAKT_CLIENT_ID,
};

interface FanartImages {
  posterUrl: string | null;
  backdropUrl: string | null;
}

async function fetchFanartImages(tmdbId: number | null): Promise<FanartImages> {
  if (!tmdbId || !FANART_API_KEY) return { posterUrl: null, backdropUrl: null };
  try {
    const res = await axios.get(`${FANART_BASE}/movies/${tmdbId}`, {
      params: { api_key: FANART_API_KEY },
    });
    const posters: any[] = res.data.movieposter ?? [];
    const backgrounds: any[] = res.data.moviebackground ?? [];

    const bestPoster = [...posters]
      .sort((a, b) => {
        if (a.lang === 'en' && b.lang !== 'en') return -1;
        if (b.lang === 'en' && a.lang !== 'en') return 1;
        return Number(b.likes) - Number(a.likes);
      })[0]?.url ?? null;

    const bestBackdrop = [...backgrounds]
      .sort((a, b) => Number(b.likes) - Number(a.likes))[0]?.url ?? null;

    return { posterUrl: bestPoster, backdropUrl: bestBackdrop };
  } catch {
    return { posterUrl: null, backdropUrl: null };
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function traktMovieToNormalized(m: any, posterUrl: string | null): NormalizedMovie {
  const firstGenre: string | undefined = m.genres?.[0];
  return {
    id: m.ids?.tmdb ?? m.ids?.trakt,
    title: m.title,
    posterUrl,
    rating: m.rating ?? 0,
    genre: firstGenre ? capitalize(firstGenre) : undefined,
  };
}

async function fetchTraktList(endpoint: string): Promise<NormalizedMovie[]> {
  const res = await axios.get(`${TRAKT_BASE}${endpoint}`, {
    headers: traktHeaders,
    params: { extended: 'full', limit: 20 },
  });

  // Trending wraps items in { watchers, movie }; others return movie objects directly
  const movies: any[] = (res.data ?? []).map((item: any) => item.movie ?? item);

  const posterUrls = await Promise.all(
    movies.map(m => fetchFanartImages(m.ids?.tmdb ?? null).then(r => r.posterUrl))
  );

  return movies.map((m, i) => traktMovieToNormalized(m, posterUrls[i]));
}

export class TraktProvider implements MovieProvider {
  async search(query: string): Promise<NormalizedMovie[]> {
    const res = await axios.get(`${TRAKT_BASE}/search/movie`, {
      headers: traktHeaders,
      params: { query, extended: 'full' },
    });
    const movies: any[] = (res.data ?? []).map((item: any) => item.movie ?? item);

    const posterUrls = await Promise.all(
      movies.map(m => fetchFanartImages(m.ids?.tmdb ?? null).then(r => r.posterUrl))
    );

    return movies.map((m, i) => traktMovieToNormalized(m, posterUrls[i]));
  }

  async getDetails(id: string | number): Promise<NormalizedMovieDetail> {
    // Look up by TMDB ID via Trakt's ID search endpoint
    const res = await axios.get(`${TRAKT_BASE}/search/tmdb/${id}`, {
      headers: traktHeaders,
      params: { type: 'movie', extended: 'full' },
    });
    const m = (res.data ?? [])[0]?.movie;
    if (!m) throw new Error(`Movie ${id} not found on Trakt`);

    const tmdbId: number = m.ids?.tmdb ?? Number(id);
    const { posterUrl, backdropUrl } = await fetchFanartImages(tmdbId);

    return {
      id: tmdbId,
      title: m.title,
      posterUrl,
      backdropUrl,
      rating: m.rating ?? 0,
      releaseDate: m.released ?? '',
      runtime: m.runtime ?? 0,
      overview: m.overview ?? '',
      genres: (m.genres ?? []).map((g: string) => ({ id: g, name: capitalize(g) })),
      tagline: m.tagline,
    };
  }

  getTrending = () => fetchTraktList('/movies/trending');
  getPopular = () => fetchTraktList('/movies/popular');
  // Most watched all-time is the closest Trakt equivalent to "top rated"
  getTopRated = () => fetchTraktList('/movies/watched/all');
  // Most anticipated is the closest equivalent to "upcoming"
  getUpcoming = () => fetchTraktList('/movies/anticipated');
}
