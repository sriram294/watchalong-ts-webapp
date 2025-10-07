import { Users, Film } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";



import { Group } from "@/types/group";

interface GroupCardProps extends Group {
  onEnter: () => void;
}

export function GroupCard({ name, members, groupMovieLinks, onEnter }: GroupCardProps) {
  const visibleMembers = members.slice(0, 5);
  const memberCount = members.length;
  const movieCount = groupMovieLinks.length;
  const remainingCount = memberCount - 5;

  return (
    <Card className="p-4 hover-elevate active-elevate-2 cursor-pointer" onClick={onEnter} data-testid={`card-group-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-2 truncate" data-testid={`text-group-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span data-testid={`text-member-count-${name.toLowerCase().replace(/\s+/g, '-')}`}>{memberCount} members</span>
            </div>
            <div className="flex items-center gap-1">
              <Film className="w-4 h-4" />
              <span data-testid={`text-movie-count-${name.toLowerCase().replace(/\s+/g, '-')}`}>{movieCount} movies</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {visibleMembers.map((member) => (
                <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {remainingCount > 0 && (
              <span className="text-xs text-muted-foreground">+{remainingCount} more</span>
            )}
          </div>
        </div>

        <Button size="sm" variant="default" onClick={onEnter} data-testid={`button-enter-group-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          Enter
        </Button>
      </div>
    </Card>
  );
}
