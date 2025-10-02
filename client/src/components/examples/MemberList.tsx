import { MemberList } from '../MemberList';

export default function MemberListExample() {
  const mockMembers = [
    { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
  ];

  return (
    <div className="max-w-xs p-4">
      <MemberList members={mockMembers} />
    </div>
  );
}
