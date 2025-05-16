import React, { useState } from 'react';
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

interface NewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewUserDialog = ({ open, onOpenChange }: NewUserDialogProps) => {
  const { addUser } = useTaskContext();
  const { toast } = useToast();
  
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'team',
    avatar: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (role: string) => {
    setNewUser(prev => ({ ...prev, role: role as 'admin' | 'team' }));
  };
  
  const handleSubmit = () => {
    if (!newUser.name || !newUser.email) return;
    
    addUser(newUser);
    onOpenChange(false);
    
    toast({
      title: "User created",
      description: "The new user has been successfully created."
    });
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      role: 'team',
      avatar: ''
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={newUser.name} 
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
              value={newUser.email} 
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
              value={newUser.avatar || ''} 
              onChange={handleChange} 
              placeholder="https://example.com/avatar.jpg" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={newUser.role} 
              onValueChange={handleRoleChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="team">Team Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
