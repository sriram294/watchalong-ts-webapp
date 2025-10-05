import axios from "axios";
import { BACKEND_BASE } from "../../../config";

export async function onAddToWatchlist(
  movieId: number,
  watchlistMovieIds: number[],
  onAuthRedirect?: () => void
) {
  try {
    if (watchlistMovieIds.includes(movieId)) {
      await axios.delete(`${BACKEND_BASE}/api/watchlist/remove`, {
        params: { movieId },
        withCredentials: true,
      });
    } else {
      await axios.post(`${BACKEND_BASE}/api/watchlist/add-movie`, null, {
        params: { movieId },
        withCredentials: true,
      });
    }
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      if (onAuthRedirect) {
        onAuthRedirect();
      } else {
        window.location.href = `${BACKEND_BASE}/oauth2/authorization/google`;
      }
    }
  }
}
