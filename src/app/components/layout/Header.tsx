import React from 'react';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';
import { Plus, PanelLeft, Settings } from 'lucide-react';
import { SidebarTrigger as Trigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

export const Header = ({ openNewTaskDialog }: { openNewTaskDialog: () => void }) => {
  const { isAdmin } = useTaskContext();
  
  return (
    <header className="border-b bg-card p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Trigger className="mr-4 md:hidden">
          <PanelLeft className="h-5 w-5" />
        </Trigger>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {isAdmin && (
          <>
            <Button onClick={openNewTaskDialog}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
            <Link to="/admin">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
