import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "../config";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export default function JoinGroup() {
  const [location, setLocation] = useLocation();
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const user = useUser();

  // Get inviteCode from URL
  const params = new URLSearchParams(window.location.search);
  const inviteCode = params.get("inviteCode");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!inviteCode) {
      setStatus("No invite code provided.");
      return;
    }
    setLoading(true);
    axiosInstance.post(`${BACKEND_BASE}/api/groups/join?inviteCode=${encodeURIComponent(inviteCode)}`)
      .then(() => {
        setStatus("Successfully joined the group!");
      })
      .catch(() => {
        setStatus("Failed to join group. Invalid or expired invite code.");
      })
      .finally(() => setLoading(false));
  }, [inviteCode, user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 bg-card rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Join Group</h1>
        {loading ? (
          <div>Joining group...</div>
        ) : (
          <div className="mb-4 text-center">{status}</div>
        )}
        <Button onClick={() => setLocation("/groups")}>Go to My Groups</Button>
      </div>
    </div>
  );
}
