import { Task, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: 'user2',
    name: 'Team Member',
    email: 'team@example.com',
    role: 'team',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=team'
  },
  {
    id: 'user3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'team',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Design new dashboard',
    description: 'Create wireframes and mockups for the new admin dashboard',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-05-25',
    createdAt: '2025-05-15',
    assignedTo: 'user2',
    createdBy: 'user1'
  },
  {
    id: 'task2',
    title: 'Implement authentication',
    description: 'Set up user authentication with JWT tokens',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-05-20',
    createdAt: '2025-05-10',
    assignedTo: 'user3',
    createdBy: 'user1'
  },
  {
    id: 'task3',
    title: 'Fix navigation bug',
    description: 'The sidebar navigation breaks on mobile views',
    status: 'done',
    priority: 'medium',
    dueDate: '2025-05-12',
    createdAt: '2025-05-08',
    assignedTo: 'user2',
    createdBy: 'user1'
  },
  {
    id: 'task4',
    title: 'Write documentation',
    description: 'Create developer documentation for the API endpoints',
    status: 'todo',
    priority: 'low',
    dueDate: '2025-05-30',
    createdAt: '2025-05-15',
    assignedTo: 'user3',
    createdBy: 'user1'
  },
  {
    id: 'task5',
    title: 'Create landing page',
    description: 'Design and implement the new marketing landing page',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-05-22',
    createdAt: '2025-05-12',
    assignedTo: 'user2',
    createdBy: 'user1'
  }
];
