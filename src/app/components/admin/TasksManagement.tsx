import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types';
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
import { format } from 'date-fns';
import { EditTaskDialog } from './EditTaskDialog';
import { Pencil, Trash2 } from 'lucide-react';
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

export const TasksManagement = () => {
  const { tasks, users, deleteTask } = useTaskContext();
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleEdit = (task: Task) => {
    setEditTask(task);
  };
  
  const handleDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted."
      });
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };
  
  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unassigned';
  };
  
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500';
  };
  
  const getStatusColor = (status: string) => {
    const colors = {
      'todo': 'bg-gray-500',
      'in-progress': 'bg-blue-500',
      'done': 'bg-green-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Tasks Management</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(task.status)} text-white`}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{getUserName(task.assignedTo)}</TableCell>
                  <TableCell>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(task)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(task.id)}
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
      
      {/* Edit Task Dialog */}
      {editTask && (
        <EditTaskDialog 
          task={editTask} 
          open={!!editTask} 
          onOpenChange={(open) => !open && setEditTask(null)} 
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
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
