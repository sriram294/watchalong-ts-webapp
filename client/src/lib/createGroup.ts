import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "../config";

export async function createGroup(name: string): Promise<any> {
  const res = await axiosInstance.post(`${BACKEND_BASE}/api/groups/create`, null, { params: { name }, withCredentials: true });
  return res.data;
}
