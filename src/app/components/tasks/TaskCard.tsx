import { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Clock, Flag } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { users, updateTask, isAdmin } = useTaskContext();
  
  const assignedUser = users.find(user => user.id === task.assignedTo);
  
  const priorityColors = {
    low: 'bg-task-low text-white',
    medium: 'bg-task-medium text-white',
    high: 'bg-task-high text-white'
  };
  
//   const statusColors = {
//     'todo': 'bg-secondary text-secondary-foreground',
//     'in-progress': 'bg-blue-500 text-white',
//     'done': 'bg-green-500 text-white'
//   };
  
  const handleStatusChange = (newStatus: string) => {
    updateTask(task.id, { status: newStatus as 'todo' | 'in-progress' | 'done' });
  };
  
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-medium">{task.title}</h3>
        </div>
        <Badge className={priorityColors[task.priority]}>
          <Flag className="h-3 w-3 mr-1" />
          {task.priority}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
        
        <div className="flex items-center text-sm mb-1">
          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
          <span className={`${isOverdue ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
            {isOverdue ? "Overdue: " : "Due: "}
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={assignedUser?.avatar} />
            <AvatarFallback>{assignedUser?.name.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {assignedUser?.name || 'Unassigned'}
          </span>
        </div>
        
        {(isAdmin || task.assignedTo === assignedUser?.id) && (
          <Select defaultValue={task.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-24 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};
