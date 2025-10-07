import axiosInstance from "@/lib/axios";
import { Navbar } from "@/components/Navbar";
import { GroupMovieCard } from "@/components/GroupMovieCard";
import { MemberList } from "@/components/MemberList";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useEffect, useState } from "react";
import { GroupMovie } from "@/types/groupmovie";
import { useState as useReactState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User } from "@/types/user";
import axios from "axios";
import { BACKEND_BASE, TMDB_API_KEY } from "../config";

export default function GroupDetail() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const [groupMovies, setGroupMovies] = useState<GroupMovie[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [inviteCode, setInviteCode] = useReactState<string>("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(()=>{
    load()
  },[id])


  const load = async () => {
    try {
      const res = await axiosInstance.get(`${BACKEND_BASE}/api/groups/${id}`);
      const groupMovieLinks = res.data.groupMovieLinks || [];

      // Fetch TMDB details for each movie in parallel
      const tmdbPromises = groupMovieLinks.map((link: any) =>
        axios.get(`https://api.themoviedb.org/3/movie/${link.movie.id}`, {
          params: { api_key: TMDB_API_KEY },
        })
          .then(tmdbRes => ({
            ...link,
            poster_path: tmdbRes.data.poster_path,
            vote_average: tmdbRes.data.vote_average,
          }))
          .catch(() => ({
            ...link,
            poster_path: null,
            vote_average: 0,
          }))
      );

      const groupMoviesWithDetails = await Promise.all(tmdbPromises);
  setGroupMovies(groupMoviesWithDetails);
  setMembers(res.data.members || []);
  setGroupName(res.data.name || "");
  setInviteCode(res.data.inviteCode || "");
    } catch (e) {
      console.error(e);
    }
  };

  
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Invite Modal */}
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite to Group</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2 items-center">
              <span className="font-semibold">Invite Link:</span>
              <span className="px-2 py-1 rounded bg-muted text-xs font-mono break-all">{`${window.location.origin}/join?inviteCode=${inviteCode}`}</span>
              <Button
                size="sm"
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/join?inviteCode=${inviteCode}`)}
              >
                Copy Invite Link
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <h1 className="text-4xl font-bold mb-2" data-testid="text-group-name">{groupName}</h1>
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
                <div key={movie.id} onClick={() => setLocation(`/groups/${id}/movie/${movie.movie.id}`)} className="cursor-pointer">
                  <GroupMovieCard
                    groupMovie={movie}
                    groupId={id}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average}
                    onVote={(vote) => console.log('Voted:', vote, 'on', movie.movie.title)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-80">
            <div className="sticky top-20">
              <MemberList 
                members={members} 
                onInvite={() => setShowInviteModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
