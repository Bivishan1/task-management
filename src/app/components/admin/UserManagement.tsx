import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { User } from '@/types';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EditUserDialog } from './EditUserDialog';
import { Pencil, Trash2, User as UserIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

export const UsersManagement = () => {
  const { users, currentUser, deleteUser } = useTaskContext();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleEdit = (user: User) => {
    setEditUser(user);
  };
  
  const handleDelete = (userId: string) => {
    // Prevent deleting the current user
    if (userId === currentUser?.id) {
      toast({
        title: "Cannot delete",
        description: "You cannot delete your own account.",
        variant: "destructive"
      });
      return;
    }
    
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      toast({
        title: "User deleted",
        description: "The user has been successfully deleted."
      });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Users Management</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id} className={user.id === currentUser?.id ? "bg-muted/50" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          <UserIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? "destructive" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit User Dialog */}
      {editUser && (
        <EditUserDialog 
          user={editUser} 
          open={!!editUser} 
          onOpenChange={(open) => !open && setEditUser(null)} 
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user and reassign their tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
