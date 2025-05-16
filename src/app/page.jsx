'use client';
import { useState, useEffect } from "react";
import { Filter, Plus, User, Users, CheckCircle, Clock, Edit, Trash, UserPlus } from "lucide-react";

// Mock data for tasks and users
const mockTasks = [
  {
    id: 1,
    title: "Redesign homepage",
    description: "Update the UI for better user experience",
    status: "To-Do",
    assignedTo: "john",
    priority: "High",
    dueDate: "2025-05-20"
  },
  {
    id: 2,
    title: "Fix login bug",
    description: "Users are experiencing issues with social logins",
    status: "In Progress",
    assignedTo: "sarah",
    priority: "Critical",
    dueDate: "2025-05-17"
  },
  {
    id: 3,
    title: "Deploy new API",
    description: "Deploy v2 API to production",
    status: "Done",
    assignedTo: "mike",
    priority: "Medium",
    dueDate: "2025-05-15"
  },
  {
    id: 4,
    title: "Write documentation",
    description: "Create user documentation for new features",
    status: "To-Do",
    assignedTo: "sarah",
    priority: "Low",
    dueDate: "2025-05-25"
  }
];

const mockUsers = [
  { id: "john", name: "John Doe", role: "admin", email: "john@example.com" },
  { id: "sarah", name: "Sarah Smith", role: "member", email: "sarah@example.com" },
  { id: "mike", name: "Mike Johnson", role: "member", email: "mike@example.com" }
];

// Priority badges
const PriorityBadge = ({ priority }) => {
  const colors = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-green-100 text-green-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800"
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[priority]}`}>
      {priority}
    </span>
  );
};

// Status badges
const StatusBadge = ({ status }) => {
  const colors = {
    "To-Do": "bg-gray-100 text-gray-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "Done": "bg-green-100 text-green-800"
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export default function TaskManagementDashboard() {
  const [tasks, setTasks] = useState(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState(mockTasks);
  const [users, setUsers] = useState(mockUsers);
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("tasks");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To-Do",
    assignedTo: "",
    priority: "Medium",
    dueDate: ""
  });
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "member"
  });
  
  // Current user (would come from auth context in a real app)
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  
  // Filter tasks based on status and user role
  useEffect(() => {
    let filtered = [...tasks];
    
    // Filter by status if not "All"
    if (statusFilter !== "All") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    // Filter by user if not admin
    if (currentUser.role !== "admin") {
      filtered = filtered.filter(task => task.assignedTo === currentUser.id);
    }
    
    setFilteredTasks(filtered);
  }, [tasks, statusFilter, currentUser]);
  
  // Handle creating/updating a task
  const handleSaveTask = () => {
    if (isEditMode) {
      // Update existing task
      const updatedTasks = tasks.map(task => 
        task.id === selectedTask.id ? { ...newTask, id: selectedTask.id } : task
      );
      setTasks(updatedTasks);
    } else {
      // Create new task
      const taskWithId = {
        ...newTask,
        id: tasks.length + 1,
      };
      setTasks([...tasks, taskWithId]);
    }
    
    setIsTaskModalOpen(false);
    setIsEditMode(false);
    setSelectedTask(null);
    setNewTask({
      title: "",
      description: "",
      status: "To-Do",
      assignedTo: "",
      priority: "Medium",
      dueDate: ""
    });
  };
  
  // Handle creating a new user
  const handleSaveUser = () => {
    if (isEditMode) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === newUser.id ? newUser : user
      );
      setUsers(updatedUsers);
    } else {
      // Create new user
      setUsers([...users, newUser]);
    }
    
    setIsUserModalOpen(false);
    setIsEditMode(false);
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "member"
    });
  };
  
  // Handle editing a task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setNewTask({...task});
    setIsEditMode(true);
    setIsTaskModalOpen(true);
  };
  
  // Handle editing a user
  const handleEditUser = (user) => {
    setNewUser({...user});
    setIsEditMode(true);
    setIsUserModalOpen(true);
  };
  
  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  // Handle deleting a user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    // Also remove tasks assigned to this user or reassign them
    setTasks(tasks.map(task => 
      task.assignedTo === userId ? { ...task, assignedTo: "" } : task
    ));
  };
  
  // Toggle user role for demo purposes
  const toggleUserRole = () => {
    if (currentUser.role === "admin") {
      setCurrentUser(mockUsers[1]); // Switch to member
      setActiveTab("tasks"); // Reset to tasks tab for members
    } else {
      setCurrentUser(mockUsers[0]); // Switch to admin
    }
  };
  
  // Check if task is editable by current user
  const canEditTask = (task) => {
    return currentUser.role === "admin" || task.assignedTo === currentUser.id;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Task Management Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleUserRole}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {currentUser.role === "admin" ? (
                <>
                  <Users className="h-4 w-4 mr-2" />
                  Admin View
                </>
              ) : (
                <>
                  <User className="h-4 w-4 mr-2" />
                  Member View ({currentUser.name})
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
        {/* Tabs - Only show Users tab for admins */}
        {currentUser.role === "admin" && (
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("tasks")}
                className={`${
                  activeTab === "tasks"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Tasks
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`${
                  activeTab === "users"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Users
              </button>
            </nav>
          </div>
        )}
        
        {/* Tasks View */}
        {activeTab === "tasks" && (
          <>
            {/* Filters and actions */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>All</option>
                  <option>To-Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedTask(null);
                  setNewTask({
                    title: "",
                    description: "",
                    status: "To-Do",
                    assignedTo: "",
                    priority: "Medium",
                    dueDate: ""
                  });
                  setIsTaskModalOpen(true);
                }} 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </button>
            </div>
            
            {/* Tasks grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <div key={task.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{task.title}</h3>
                      <StatusBadge status={task.status} />
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">{task.description}</p>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1 text-gray-400" />
                        Assigned to: {users.find(u => u.id === task.assignedTo)?.name || "Unassigned"}
                      </div>
                      
                      <div className="flex items-center">
                        <PriorityBadge priority={task.priority} />
                      </div>
                    </div>
                    
                    {/* Task actions - Only shown if user can edit this task */}
                    {canEditTask(task) && (
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEditTask(task)}
                          className="inline-flex items-center px-2 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        
                        {currentUser.role === "admin" && (
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="inline-flex items-center px-2 py-1 text-sm font-medium text-red-600 hover:text-red-900"
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty state */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {statusFilter !== "All" 
                    ? `No tasks with "${statusFilter}" status found.` 
                    : "No tasks available. Create a new task to get started."}
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Users Management - Admin Only */}
        {activeTab === "users" && currentUser.role === "admin" && (
          <>
            {/* Users actions */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setNewUser({
                    id: "",
                    name: "",
                    email: "",
                    role: "member"
                  });
                  setIsUserModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </button>
            </div>
            
            {/* Users list */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id}>
                    <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
                        }`}>
                          {user.role === "admin" ? "Admin" : "Member"}
                        </span>
                        <div className="ml-4 flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 ml-2"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
      
      {/* Task modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {isEditMode ? "Edit Task" : "Create New Task"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={3}
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={newTask.status}
                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>To-Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <select
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select user</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveTask}
                  disabled={!newTask.title || !newTask.assignedTo || !newTask.dueDate}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTaskModalOpen(false);
                    setIsEditMode(false);
                    setSelectedTask(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* User modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {isEditMode ? "Edit User" : "Add New User"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={newUser.id}
                      onChange={(e) => setNewUser({...newUser, id: e.target.value})}
                      disabled={isEditMode}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveUser}
                  disabled={!newUser.id || !newUser.name || !newUser.email}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsUserModalOpen(false);
                    setIsEditMode(false);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}