import axios from "axios";
import { BACKEND_BASE } from "../../../config";
import { Movie } from "@/types/movie";

export async function fetchGroups(): Promise<any[]> {
  try {
    const res = await axios.get(`${BACKEND_BASE}/api/groups/fetchGroups`, { withCredentials: true });
    return res.data || [];
  } catch (err: any) {
    if (err.response && err.response.status === 302) {
      window.location.href = err.response.headers.location;
    } else {
      console.error(err);
    }
    return [];
  }
}

export async function addMovieToGroups(
  groupIds: (string | number)[],
  movie: Movie
): Promise<void> {
  for (const groupId of groupIds) {
    try {
      await axios.post(`${BACKEND_BASE}/api/groups/${groupId}/add-movie`, movie, { withCredentials: true });
    } catch (err: any) {
      if (err.response && err.response.status === 302) {
        window.location.href = err.response.headers.location;
      } else {
        console.error(err);
      }
    }
  }
}
