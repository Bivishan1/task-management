import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types';
import { format } from 'date-fns';

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ open, onOpenChange }) => {
  const { users, addTask, currentUser } = useTaskContext();
  
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'), // 1 week from now
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    assignedTo: '',
    createdBy: currentUser?.id || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    if (!newTask.title || !newTask.assignedTo) return;
    
    addTask(newTask);
    onOpenChange(false);
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      assignedTo: '',
      createdBy: currentUser?.id || '',
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={newTask.title} 
              onChange={handleChange} 
              placeholder="Task title"
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={newTask.description} 
              onChange={handleChange} 
              placeholder="Task description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select
                value={newTask.assignedTo}
                onValueChange={(value: string) => handleSelectChange('assignedTo', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user: { id: string; name: string }) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={newTask.priority} 
                onValueChange={(value:string) => handleSelectChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input 
              id="dueDate" 
              name="dueDate" 
              type="date" 
              value={newTask.dueDate} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
