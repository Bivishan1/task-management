
import React, { useState } from 'react';
import { Header } from './layout/Header';
import { TaskFilters } from './tasks/TaskFilters';
import { TaskGrid } from './tasks/TaskGrid';
import { NewTaskDialog } from './tasks/NewtaskDialog';

export const Dashboard = () => {
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  
  return (
    <div className="flex-1 overflow-auto">
      <Header openNewTaskDialog={() => setNewTaskDialogOpen(true)} />
      
      <main className="p-4 md:p-6">
        <TaskFilters />
        <TaskGrid />
      </main>
      
      <NewTaskDialog 
        open={newTaskDialogOpen} 
        onOpenChange={setNewTaskDialogOpen} 
      />
    </div>
  );
};