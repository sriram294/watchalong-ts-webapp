import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { BACKEND_BASE } from "../config";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function JoinGroup() {
  const [location, setLocation] = useLocation();
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Get inviteCode from URL
  const params = new URLSearchParams(window.location.search);
  const inviteCode = params.get("inviteCode");
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!inviteCode) {
      setStatus("No invite code provided.");
      return;
    }
    setLoading(true);
    // Check login status
    axios.get(`${BACKEND_BASE}/api/auth/check`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.data && res.data.authenticated) {
          // User is logged in, proceed to join group
          return axios.post(`${BACKEND_BASE}/api/groups/join?inviteCode=${encodeURIComponent(inviteCode)}`, null, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          // Not logged in, redirect to backend OAuth login with target url
          const targetUrl = window.location.pathname + window.location.search;
          window.location.href = `${BACKEND_BASE}/oauth2/authorization/google?targetUrl=${encodeURIComponent(targetUrl)}`;
          throw new Error("Redirecting to login");
        }
      })
      .then(() => {
        setStatus("Successfully joined the group!");
      })
      .catch((err) => {
        if (err.message !== "Redirecting to login") {
          setStatus("Failed to join group. Invalid or expired invite code.");
        }
      })
      .finally(() => setLoading(false));
  }, [inviteCode]);

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
