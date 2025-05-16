import React from 'react';
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Check, Clock, Flag, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTaskContext } from '@/contexts/TaskContext';
import Link from 'next/link';

export const AppSidebar = () => {
  const { currentUser, isAdmin, logout } = useTaskContext();
  
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">TaskFlow</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#">
                    <Clock />
                    <span>All Tasks</span>
                 </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#todo">
                    <Flag />
                    <span>To Do</span>
                 </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#in-progress">
                    <Clock />
                    <span>In Progress</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#done">
                    <Check />
                    <span>Completed</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/#users">
                      <Users />
                      <span>Manage Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <div className="mt-auto p-4 border-t">
        {currentUser ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
            </div>
            <Button className="h-8 px-3 py-1 text-sm" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button  className="w-full h-8 px-3 py-1 text-sm">
            Login
          </Button>
        )}
      </div>
    </ShadcnSidebar>
  );
};
