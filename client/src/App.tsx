import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Watchlist from "@/pages/Watchlist";
import Groups from "@/pages/Groups";
import GroupDetail from "@/pages/GroupDetail";
import SearchPage from "@/pages/SearchPage";
import Login from "@/pages/Login";
import MovieDetail from "./pages/MovieDetail";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route path="/search" component={SearchPage} />
      <Route path="/watchlist" component={Watchlist} />
      <Route path="/groups" component={Groups} />
      <Route path="/groups/:id" component={GroupDetail} />
      <Route path="/movie/:id" component={MovieDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
