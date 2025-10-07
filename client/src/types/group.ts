import { User } from "./user";
import { GroupMovie } from "./groupmovie";

export interface Group {
  id: number | string;
  name: string;
  inviteCode: string;
  members: User[];
  createdBy: string | null;
  groupMovieLinks: GroupMovie[];
}