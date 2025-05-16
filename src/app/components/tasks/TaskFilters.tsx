import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Check, Clock, Flag } from 'lucide-react';

export const TaskFilters = () => {
  const { filter, setFilter } = useTaskContext();
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={filter === 'all' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setFilter('all')}
      >
        <Clock className="h-4 w-4 mr-2" />
        All
      </Button>
      
      <Button 
        variant={filter === 'todo' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setFilter('todo')}
      >
        <Flag className="h-4 w-4 mr-2" />
        To Do
      </Button>
      
      <Button 
        variant={filter === 'in-progress' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setFilter('in-progress')}
      >
        <Clock className="h-4 w-4 mr-2" />
        In Progress
      </Button>
      
      <Button 
        variant={filter === 'done' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setFilter('done')}
      >
        <Check className="h-4 w-4 mr-2" />
        Done
      </Button>
    </div>
  );
};
