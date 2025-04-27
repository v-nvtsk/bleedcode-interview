export interface User{
  id: number;
  username: string;
  role: string;
  state: string;
  accessToken: string;
  tasks: Task[];
  rating: number;
}
export interface Task{
  id: number;
  title: string;
  description: string;
  examples: string;
  difficulty: string;
  tags: string[];
  additional_materials: string[];
  category: string;
  code: string;
}
export interface Comments{
  id: number;
  task_id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: Date;
}
