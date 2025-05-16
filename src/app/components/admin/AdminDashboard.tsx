import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TasksManagement } from './TasksManagement';
import { UsersManagement } from './UserManagement';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import { NewTaskDialog } from '../tasks/NewtaskDialog';
import { NewUserDialog } from './NewUserDialog';

export const AdminDashboard = () => {
  const { isAdmin } = useTaskContext();
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  
  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">You don not have permission to access the admin dashboard.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      
      <Tabs defaultValue="tasks" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <div>
            <TabsContent value="tasks" className="m-0">
              <Button onClick={() => setNewTaskDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </TabsContent>
            <TabsContent value="users" className="m-0">
              <Button onClick={() => setNewUserDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New User
              </Button>
            </TabsContent>
          </div>
        </div>
        
        <TabsContent value="tasks">
          <TasksManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <UsersManagement />
        </TabsContent>
      </Tabs>
      
      <NewTaskDialog 
        open={newTaskDialogOpen} 
        onOpenChange={setNewTaskDialogOpen} 
      />
      
      <NewUserDialog
        open={newUserDialogOpen}
        onOpenChange={setNewUserDialogOpen}
      />
    </div>
  );
};
