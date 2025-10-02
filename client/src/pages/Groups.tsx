import { Navbar } from "@/components/Navbar";
import { GroupCard } from "@/components/GroupCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function Groups() {
  const [, setLocation] = useLocation();

  const groups = [
    {
      id: '1',
      name: 'Movie Night Crew',
      memberCount: 8,
      movieCount: 12,
      members: [
        { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: '4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: '5', name: 'Eve Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
      ],
    },
    {
      id: '2',
      name: 'Sci-Fi Lovers',
      memberCount: 5,
      movieCount: 8,
      members: [
        { id: '6', name: 'Frank Miller', avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: '7', name: 'Grace Lee', avatar: 'https://i.pravatar.cc/150?img=7' },
        { id: '8', name: 'Henry Wilson', avatar: 'https://i.pravatar.cc/150?img=8' },
      ],
    },
    {
      id: '3',
      name: 'Classic Cinema Club',
      memberCount: 12,
      movieCount: 24,
      members: [
        { id: '9', name: 'Ivy Chen', avatar: 'https://i.pravatar.cc/150?img=9' },
        { id: '10', name: 'Jack Davis', avatar: 'https://i.pravatar.cc/150?img=10' },
        { id: '11', name: 'Kate Moore', avatar: 'https://i.pravatar.cc/150?img=11' },
        { id: '12', name: 'Liam Taylor', avatar: 'https://i.pravatar.cc/150?img=12' },
        { id: '13', name: 'Mia Anderson', avatar: 'https://i.pravatar.cc/150?img=13' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" data-testid="text-groups-title">My Groups</h1>
            <p className="text-muted-foreground" data-testid="text-groups-count">
              {groups.length} groups joined
            </p>
          </div>
          <Button onClick={() => console.log('Create group')} data-testid="button-create-group">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              {...group}
              onEnter={() => setLocation(`/groups/${group.id}`)}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
