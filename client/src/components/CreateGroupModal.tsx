import { useState } from "react";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (groupName: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export function CreateGroupModal({ open, onClose, onCreate, loading = false, error = null }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!groupName.trim()) {
      setLocalError("Group name cannot be empty");
      return;
    }
    setLocalError(null);
    await onCreate(groupName.trim());
    setGroupName("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="shadcn-card rounded-xl border backdrop-blur-xl bg-background/30 border-card-border text-card-foreground shadow-sm p-6 min-w-[320px]">
        <h2 className="text-lg font-bold mb-4">Create Group</h2>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded mb-2"
          placeholder="Enter group name"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          disabled={loading}
        />
        {(localError || error) && <div className="text-red-500 text-sm mb-2">{localError || error}</div>}
        <div className="flex gap-2 justify-end mt-2">
          <button
            className="px-4 py-2 bg-muted rounded hover:bg-muted/80"
            onClick={() => { setGroupName(""); setLocalError(null); onClose(); }}
            disabled={loading}
          >Cancel</button>
          <button
            className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/90"
            onClick={handleCreate}
            disabled={loading}
          >{loading ? "Creating..." : "Create"}</button>
        </div>
      </div>
    </div>
  );
}
