import React from 'react';
import { TaskCard } from './TaskCard';
import { useTaskContext } from '@/contexts/TaskContext';

export const TaskGrid = () => {
  const { filteredTasks } = useTaskContext();
  
  if (filteredTasks.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border border-dashed rounded-lg bg-secondary/50">
        <p className="text-muted-foreground">No tasks found. Create a new task to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )};