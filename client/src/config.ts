export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY ?? '';
export const TRAKT_CLIENT_ID = import.meta.env.VITE_TRAKT_CLIENT_ID ?? '';
export const FANART_API_KEY = import.meta.env.VITE_FANART_API_KEY ?? '';
export const MOVIE_PROVIDER = (import.meta.env.VITE_MOVIE_PROVIDER ?? 'tmdb') as 'tmdb' | 'trakt';
export const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE;
