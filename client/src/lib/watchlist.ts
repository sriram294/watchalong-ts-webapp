import axiosInstance from "@/lib/axios";
import axios from "axios";
import { BACKEND_BASE } from "../config";

export async function onAddToWatchlist(
  movieId: number,
  title: string,
  watchlistMovieIds: number[],
  onAuthRedirect?: () => void
) {
  try {
    if (watchlistMovieIds.includes(movieId)) {
      await axiosInstance.delete(`${BACKEND_BASE}/api/watchlist/remove`, {
        params: { movieId }
      });
    } else {
      await axiosInstance.post(`${BACKEND_BASE}/api/watchlist/add-movie`, null, {
        params: { movieId, title }
      });
    }
  } catch (err: any) {
    if (err.response?.status === 401) {
      if (onAuthRedirect) {
        onAuthRedirect();
      } else {
        window.location.href = `${BACKEND_BASE}/oauth2/authorization/google`;
      }
    }
  }
}
