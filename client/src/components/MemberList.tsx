import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface MemberListProps {
  members: Member[];
  onInvite?: () => void;
}

export function MemberList({ members, onInvite }: MemberListProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold" data-testid="text-members-title">Members</h3>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => {
            onInvite?.();
            console.log('Invite clicked');
          }}
          data-testid="button-invite-member"
        >
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3" data-testid={`member-item-${member.id}`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium truncate" data-testid={`text-member-name-${member.id}`}>
              {member.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
