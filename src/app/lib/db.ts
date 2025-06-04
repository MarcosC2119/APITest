// Mock database for tasks
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

// Using a more stable way to store tasks
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Learn Next.js",
    description: "Study Next.js documentation and tutorials",
    completed: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Build API",
    description: "Create a REST API with Next.js",
    completed: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

// Create a class to manage the database state
class TaskDatabase {
  private tasks: Task[];

  constructor(initialData: Task[] = []) {
    this.tasks = [...initialData];
  }

  getAll() {
    return [...this.tasks];
  }

  getById(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  create(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: this.tasks.length + 1,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

  update(id: number, updates: Partial<Task>) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return null;
    
    const updatedTask = { ...this.tasks[index], ...updates };
    this.tasks[index] = updatedTask;
    return { ...updatedTask };
  }

  delete(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    
    this.tasks = this.tasks.filter(task => task.id !== id);
    return true;
  }
}

// Create a singleton instance
export const db = new TaskDatabase(initialTasks); 