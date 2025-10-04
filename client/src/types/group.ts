import { User } from "./user";

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  movieCount: number;
  members: User[];
  // Add other properties if needed
};