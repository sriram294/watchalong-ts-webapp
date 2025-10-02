import { Navbar } from "@/components/Navbar";
import { GroupMovieCard } from "@/components/GroupMovieCard";
import { MemberList } from "@/components/MemberList";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function GroupDetail() {
  const [, setLocation] = useLocation();

  const groupMovies = [
    { id: 1, title: 'Interstellar', posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.6, upvotes: 12, downvotes: 3 },
    { id: 2, title: 'The Matrix', posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', rating: 8.7, upvotes: 8, downvotes: 1 },
    { id: 3, title: 'Blade Runner 2049', posterPath: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', rating: 8.0, upvotes: 6, downvotes: 2 },
    { id: 4, title: 'Arrival', posterPath: '/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg', rating: 7.9, upvotes: 5, downvotes: 1 },
  ];

  const members = [
    { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Eve Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setLocation('/groups')}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2" data-testid="text-group-name">Movie Night Crew</h1>
            <p className="text-muted-foreground" data-testid="text-group-description">
              Vote on movies to watch together
            </p>
          </div>
          <Button onClick={() => console.log('Add movie to group')} data-testid="button-add-movie">
            <Plus className="w-4 h-4 mr-2" />
            Add Movie
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {groupMovies.map((movie) => (
                <GroupMovieCard
                  key={movie.id}
                  {...movie}
                  onVote={(vote) => console.log('Voted:', vote, 'on', movie.title)}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-80">
            <div className="sticky top-20">
              <MemberList 
                members={members} 
                onInvite={() => console.log('Invite member')}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
