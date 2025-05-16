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
import { useToast } from '@/hooks/use-toast';

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditTaskDialog = ({ task, open, onOpenChange }: EditTaskDialogProps) => {
  const { users, updateTask } = useTaskContext();
  const { toast } = useToast();
  
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  
  // Reset form when task changes
  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    if (!editedTask.title || !editedTask.assignedTo) return;
    
    updateTask(task.id, editedTask);
    onOpenChange(false);
    
    toast({
      title: "Task updated",
      description: "The task has been successfully updated."
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={editedTask.title} 
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
              value={editedTask.description} 
              onChange={handleChange} 
              placeholder="Task description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select 
                value={editedTask.assignedTo} 
                onValueChange={(value) => handleSelectChange('assignedTo', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={editedTask.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={editedTask.priority} 
                onValueChange={(value) => handleSelectChange('priority', value)}
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
            
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                name="dueDate" 
                type="date" 
                value={editedTask.dueDate} 
                onChange={handleChange} 
              />
            </div>
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
