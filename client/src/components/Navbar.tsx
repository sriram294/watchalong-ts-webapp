import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
              to="/"
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
                <DropdownMenuItem
                  onClick={() => console.log("Profile clicked")}
                  data-testid="menu-profile"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Logout clicked")}
                  data-testid="menu-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hamburger (only on mobile) */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
          </div>
        </div>
      )}
    </nav>
  );
}
