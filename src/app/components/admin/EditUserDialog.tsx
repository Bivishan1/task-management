import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useTaskContext } from '@/contexts/TaskContext';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditUserDialog = ({ user, open, onOpenChange }: EditUserDialogProps) => {
  const { updateUser, currentUser } = useTaskContext();
  const { toast } = useToast();
  
  const [editedUser, setEditedUser] = useState<User>({ ...user });
  
  // Reset form when user changes
  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (role: string) => {
    setEditedUser(prev => ({ ...prev, role: role as 'admin' | 'team' }));
  };
  
  const handleSubmit = () => {
    if (!editedUser.name || !editedUser.email) return;
    
    // Don't allow removing admin rights from yourself
    if (user.id === currentUser?.id && user.role === 'admin' && editedUser.role !== 'admin') {
      toast({
        title: "Cannot change role",
        description: "You cannot remove your own admin privileges.",
        variant: "destructive"
      });
      return;
    }
    
    updateUser(user.id, editedUser);
    onOpenChange(false);
    
    toast({
      title: "User updated",
      description: "The user has been successfully updated."
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={editedUser.name} 
              onChange={handleChange} 
              placeholder="User name"
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email"
              value={editedUser.email} 
              onChange={handleChange} 
              placeholder="Email address"
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="avatar">Avatar URL (optional)</Label>
            <Input 
              id="avatar" 
              name="avatar" 
              value={editedUser.avatar || ''} 
              onChange={handleChange} 
              placeholder="https://example.com/avatar.jpg" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={editedUser.role} 
              onValueChange={handleRoleChange}
              disabled={user.id === currentUser?.id && user.role === 'admin'}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="team">Team Member</SelectItem>
              </SelectContent>
            </Select>
            {user.id === currentUser?.id && user.role === 'admin' && (
              <p className="text-xs text-muted-foreground mt-1">
                You cannot change your own admin role.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
