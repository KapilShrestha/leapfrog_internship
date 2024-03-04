import { Task } from './Task';

export interface ITaskList {
  list: Task[];

  getTaskById: (id: string) => Task | null;
  getTaskByIndex: (index: number) => Task | null;

  addTask: (task: Task) => Task[];
}

export class TaskList implements ITaskList {
  list: Task[];

  constructor(tasks?: Task[]) {
    this.list = tasks || [];
  }

  addTask = (task: Task) => {
    this.list.push(task);

    return this.list;
  };

  getTaskById = (id: string) => {
    return this.list.find(item => item.id === id) || null;
  };

  getTaskByIndex = (index: number) => {
    return this.list[index] || null;
  };
  
  deleteTaskById(id: string): void {
    this.list = this.list.filter((task) => task.id !== id);
  }
}