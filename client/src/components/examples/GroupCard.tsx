import { GroupCard } from '../GroupCard';

export default function GroupCardExample() {
  const mockMembers = [
    { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Eve Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <GroupCard
        id="1"
        name="Movie Night Crew"
        memberCount={8}
        movieCount={12}
        members={mockMembers}
        onEnter={() => console.log('Enter group')}
      />
      <GroupCard
        id="2"
        name="Sci-Fi Lovers"
        memberCount={5}
        movieCount={8}
        members={mockMembers.slice(0, 3)}
        onEnter={() => console.log('Enter group')}
      />
    </div>
  );
}
