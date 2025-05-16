import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';

export const LoginForm = () => {
  const { users, login } = useTaskContext();
  
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">TaskFlow</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-muted-foreground mb-4">Choose a user to login as:</p>
              <div className="grid gap-2">
                {users.map(user => (
                  <Button 
                    key={user.id} 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => login(user.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary mr-2 flex items-center justify-center text-white text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col items-start">
                        <span>{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.role}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground text-center flex justify-center">
          This is a demo application with mock users
        </CardFooter>
      </Card>
    </div>
  );
};
