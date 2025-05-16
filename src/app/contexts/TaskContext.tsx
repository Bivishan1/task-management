import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, User } from '@/types';
import { mockTasks, mockUsers } from '@/data/mockData';

type TaskContextType = {
  tasks: Task[];
  users: User[];
  currentUser: User | null;
  filteredTasks: Task[];
  filter: 'all' | 'todo' | 'in-progress' | 'done';
  setFilter: (filter: 'all' | 'todo' | 'in-progress' | 'done') => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  isAdmin: boolean;
  login: (userId: string) => void;
  logout: () => void;
  // New user management functions
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  
  const isAdmin = currentUser?.role === 'admin';
  
  // Filter tasks based on status and user role
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter !== 'all' && task.status !== filter) {
      return false;
    }
    
    // Filter by user role (team members can only see their tasks)
    if (!isAdmin && task.assignedTo !== currentUser?.id) {
      return false;
    }
    
    return true;
  });
  
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks([...tasks, newTask as Task]);
  };
  
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // New user management functions
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
    };
    setUsers([...users, newUser as User]);
  };
  
  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  };
  
  const deleteUser = (id: string) => {
    // Don't allow deleting the current user
    if (id === currentUser?.id) return;
    
    // Remove the user
    setUsers(users.filter(user => user.id !== id));
    
    // Reassign or delete tasks assigned to this user
    setTasks(tasks.map(task => {
      if (task.assignedTo === id) {
        // Option 1: Reassign to current admin
        if (isAdmin) {
          return { ...task, assignedTo: currentUser!.id };
        }
        // Option 2: Make unassigned (could add a different approach here)
        return { ...task, assignedTo: '' };
      }
      return task;
    }));
  };
  
  const login = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUserId', userId);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
  };
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      const user = users.find(u => u.id === savedUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [users]);
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        users,
        currentUser,
        filteredTasks,
        filter,
        setFilter,
        addTask,
        updateTask,
        deleteTask,
        isAdmin,
        login,
        logout,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
