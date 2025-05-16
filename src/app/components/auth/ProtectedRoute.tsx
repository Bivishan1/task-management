import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTaskContext } from '@/contexts/TaskContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isAdmin } = useTaskContext();
  
  // Redirect to login if not logged in
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  // Redirect to dashboard if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
