import { useState } from "react";
import { User, LogOut, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { Link } from "wouter";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BACKEND_BASE } from "@/config";
import axiosInstance from "@/lib/axios";

export function Navbar() {
  const user = useUser();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`${BACKEND_BASE}/api/auth/logout`);
      localStorage.removeItem("jwt_token");
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors px-1 py-1 ${
      isActive
        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 items-center h-16">

          {/* Logo — left */}
          <Link href="/" className="flex items-center gap-2.5 w-fit" data-testid="link-logo">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-black text-sm">W</span>
            </div>
            <span className="font-display font-black text-base tracking-tight hidden sm:block">Watchalong</span>
          </Link>

          {/* Nav links — center */}
          <div className="hidden md:flex items-center justify-center gap-7">
            <NavLink to="/dashboard" className={navLinkClass} data-testid="nav-home">
              Home
            </NavLink>
            <NavLink to="/groups" className={navLinkClass} data-testid="nav-groups">
              Groups
            </NavLink>
            <NavLink to="/watchlist" className={navLinkClass} data-testid="nav-watchlist">
              Watchlist
            </NavLink>
            <NavLink to="/search" className={navLinkClass} data-testid="nav-search">
              Discover
            </NavLink>
          </div>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-1">
            <Link href="/search">
              <Button size="icon" variant="ghost" className="btn-glassy" data-testid="button-search">
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            <Button size="icon" variant="ghost" className="btn-glassy">
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="ml-1" data-testid="button-user-menu">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {user ? String(user).charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {user !== null ? (
                  <>
                    <DropdownMenuItem onClick={() => console.log("Profile clicked")} data-testid="menu-profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => window.location.href = '/login'} data-testid="menu-login">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>
    </nav>
  );
}
