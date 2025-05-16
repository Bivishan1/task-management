import React from "react";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { LoginForm } from "@/components/auth/LoginForm";
import { useTaskContext } from "@/contexts/TaskContext";

const Index = () => {
  const { currentUser } = useTaskContext();

  // Show login page if no user is logged in
  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <Dashboard />
    </div>
  );
};

export default Index;