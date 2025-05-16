export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type UserRole = 'admin' | 'team';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  assignedTo: string;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Action types for admin operations
export type AdminAction = 'edit' | 'delete';
