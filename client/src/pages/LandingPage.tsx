import { useEffect } from "react";
import { useLocation } from "wouter";

function getJwtFromFragment() {
  if (window.location.hash.startsWith("#token=")) {
    const token = window.location.hash.replace("#token=", "");
    if (token) {
      localStorage.setItem("jwt_token", token);
      // Remove fragment from URL
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      return true;
    }
  }
  return false;
}

export default function LandingPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Try to fetch and store JWT from fragment
    const stored = getJwtFromFragment();
    const jwt = localStorage.getItem("jwt_token");
    if (!stored && !jwt) {
      setLocation("/login");
      return;
    }
    // Redirect to dashboard after storing JWT (or immediately if not present)
    setTimeout(() => {
      setLocation("/dashboard");
    }, 300);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 bg-card rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Movie Tracker</h1>
        <p className="mb-2">Authenticating...</p>
      </div>
    </div>
  );
}
