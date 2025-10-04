import { Navbar } from "@/components/Navbar";
import { GroupMovieCard } from "@/components/GroupMovieCard";
import { MemberList } from "@/components/MemberList";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { User } from "@/types/user";
import axios from "axios";
import { BACKEND_BASE } from "../../../config";

export default function GroupDetail() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();

  const [groupMovies, setGroupMovies] = useState<Movie[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  useEffect(()=>{
    load()
  },[id])

  const load = async ()=> {
    try{
      const res = await axios.get(`${BACKEND_BASE}/api/groups/${id}`,{withCredentials:true})
      setGroupMovies(res.data.movies || []);
      setMembers(res.data.members || [])
    }catch(e){ console.error(e) }
  }

  
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
