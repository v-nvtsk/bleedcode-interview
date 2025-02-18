import type {Task} from "@/types";
import {api} from "./api";

interface Filter{
  startFrom?: number,
  limit?: number,
  category?: string,
  difficulty?: string,
  popularity?: {
    min: number,
    max: number
  }
}

export class TasksApi{

  static async getAllCategories(){
    try{
      const {data: categories,} = await api.get<string[]>(`/api/tasks/categories`);

      return categories;
    }
    catch{
      throw new Error('Ошибка при получении категорий');
    }
  }

  static async getAllTasks({
    startFrom = 0, limit = 10, category = '', difficulty = '', popularity = {
      min: 1,
      max: 5
    }
  }: Filter): Promise<Task[]> {

    const params = {
      offset: startFrom,
      limit,
      category,
      difficulty,
      popularity
    };

    try{
      const response = await api.get('/api/tasks', {params});

      return response.data;
    }catch{
      return [];
    }
  }

  static async getTask(id: string | number){
    try{
      const {data: task} = await api.get<Task>(`/api/tasks/${id}`);

      return task;
    }catch{
      throw new Error('Ошибка при получении задачи');
    }
  }

  static async createTask(task: Omit<Task, 'id'>){
    const {data: result} = await api.post('/api/tasks', task);

    return result.status === 201;
  }

  static async updateTask(task: Task){
    const {data: result} = await api.put(`/api/tasks/${task.id}`, task);

    return result.status === 200;
  }

  static async getTaskSolution(taskId: number | string, userId: number | string){
    try{
      const {data: solution} = await api.get(`/api/solutions?task_id=${taskId}&user_id=${userId}`);

      return solution;
    }catch{
      throw new Error('Ошибка при получении решения');
    }

  }

}
