import { useState, useEffect } from "react";
import {
  Film,
  Moon,
  Sun,
  User,
  LogOut,
  Home,
  Users,
  List,
  Menu,
  X,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "../config";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "wouter";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Check login status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axiosInstance.get(`${BACKEND_BASE}/api/auth/check`);
        setIsLoggedIn(res.data.authenticated === true);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post(`${BACKEND_BASE}/api/auth/logout`);
      setIsLoggedIn(false);
      // Remove JWT from localStorage
      localStorage.removeItem("jwt_token");
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-xl bg-background/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md"
            data-testid="link-logo"
          >
            <Film className="w-6 h-6 text-primary" />
            <span className="font-display text-xl">Watchalong</span>
          </Link>
          <div className="flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition hover-elevate active-elevate-2" +
                (isActive ? "border border-primary backdrop-blur-xl bg-background/50 text-primary" : "")
              }
            >
              <Home className="w-4 h-4" />
              Home
            </NavLink>

            <NavLink
              to="/groups"
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition hover-elevate active-elevate-2" +
                (isActive ? "border border-primary backdrop-blur-xl bg-background/50 text-primary" : "")
              }
            >
              <Users className="w-4 h-4" />
              Groups
            </NavLink>

            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition hover-elevate active-elevate-2" +
                (isActive ? "border border-primary backdrop-blur-xl bg-background/50 text-primary" : "")
              }
            >
              <List className="w-4 h-4" />
              Watchlist
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition hover-elevate active-elevate-2" +
                (isActive ? "border border-primary backdrop-blur-xl bg-background/50 text-primary" : "")
              }
            >
              <Search className="w-4 h-4" />
              Search
            </NavLink>
          </div>

          {/* Right section (Theme + User + Hamburger) */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  data-testid="button-user-menu"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => console.log("Profile clicked")}
                      data-testid="menu-profile"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      data-testid="menu-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem
                    onClick={() => window.location.href = '/login'}
                    data-testid="menu-login"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hamburger (only on mobile) 
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            */}
          </div>
          </div>
        </div>
      </div>

              
      {/*
      {isOpen && (
        <div className="md:hidden bg-background/90 border-t">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition " +
                (isActive ? "bg-gray-800 text-primary" : "hover:bg-gray-700")
              }
            >
              <Home className="w-4 h-4" />
              Home
            </NavLink>

            <NavLink
              to="/groups"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition " +
                (isActive ? "bg-gray-800 text-primary" : "hover:bg-gray-700")
              }
            >
              <Users className="w-4 h-4" />
              Groups
            </NavLink>

            <NavLink
              to="/watchlist"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition " +
                (isActive ? "bg-gray-800 text-primary" : "hover:bg-gray-700")
              }
            >
              <List className="w-4 h-4" />
              Watchlist
            </NavLink>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                "flex items-center gap-2 px-3 py-2 rounded-md transition " +
                (isActive ? "bg-gray-800 text-primary" : "hover:bg-gray-700")
              }
            >
              <Search className="w-4 h-4" />
              Search
            </NavLink>
          </div>
        </div>
      )} */}
    </nav>
  );
}
