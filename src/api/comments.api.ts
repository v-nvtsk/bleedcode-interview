import type {UserComment} from "../types";
import {api} from "./api";

type ApiComment = (Omit<UserComment, 'created_at'> & {created_at: string});

export class CommentsApi{

  static async getTaskComments(taskId: number | string): Promise<UserComment[]>{

    const id = Number(taskId);

    if (isNaN(id)){
      throw new Error('Ошибка при получении комментариев: некорректный id');
    }
    try{
      const {data: comments} = await api.get<ApiComment[]>(`/api/comments/${id}`);

      return comments.map((comment) => ({
        ...comment,
        created_at: new Date(comment.created_at)
      }));
    }catch{
      throw new Error('Ошибка при получении комментариев');
    }
  }

  static async addComment(id: number, content: string){
    try{
      const {data: comment} = await api.post<UserComment>(`/api/comments/`, {
        task_id: id,
        content
      });

      return {
        ...comment,
        created_at: new Date(comment.created_at)
      };
    }catch{
      throw new Error();
    }
  }
}
