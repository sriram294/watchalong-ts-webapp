import axiosInstance from "@/lib/axios";
import { Navbar } from "@/components/Navbar";
import { GroupCard } from "@/components/GroupCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Group } from "@/types/group";
import axios from "axios";
import { BACKEND_BASE } from "../config";
import { CreateGroupModal } from "@/components/CreateGroupModal";

export default function Groups() {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [createGroupError, setCreateGroupError] = useState<string | null>(null);
  const handleCreateGroup = async (groupName: string) => {
    setCreatingGroup(true);
    setCreateGroupError(null);
    try {
      const { createGroup } = await import("@/lib/createGroup");
      await createGroup(groupName);
      setShowCreateGroupModal(false);
      fetchGroups().then(setGroups);
    } catch (err) {
      setCreateGroupError("Failed to create group");
    } finally {
      setCreatingGroup(false);
    }
  };
  const [, setLocation] = useLocation();
  const [groups, setGroups] = useState<Group[]>([]);


  const fetchGroups = async () => {
    try {
  const res = await axiosInstance.get(
  `${BACKEND_BASE}/api/groups/fetchGroups` // important for sending session cookies
      );

      // If we get here, we are logged in and have the data
      console.log(res.data);
      return res.data.map((g: any) => ({
        id: g.id,
        name: g.name,
        inviteCode: g.inviteCode,
        members: g.members,
        createdBy: g.createdBy,
        groupMovieLinks: g.groupMovieLinks,
      }));
    } catch (err: any) {
    }
  }

  useEffect(() => {
    // This runs once on component mount
    fetchGroups().then(setGroups);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" data-testid="text-groups-title">My Groups</h1>
            <p className="text-muted-foreground" data-testid="text-groups-count">
              {groups?.length} groups joined
            </p>
          </div>
          <Button onClick={() => setShowCreateGroupModal(true)} data-testid="button-create-group">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>
        <CreateGroupModal
          open={showCreateGroupModal}
          onClose={() => { setShowCreateGroupModal(false); setCreateGroupError(null); }}
          onCreate={handleCreateGroup}
          loading={creatingGroup}
          error={createGroupError}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups?.map((group) => (
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
