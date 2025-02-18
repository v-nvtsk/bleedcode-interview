export interface AccessTokenPayload {
  username: string;
  userId: number;
}
interface SolutionInfo {
  id: number;
  title: string;
  mark: number;
}

export interface UserProfile {
  id: number;
  username: string;
  role: string;
  status: string;
  rating: number;
  solutions: SolutionInfo[];
}
export interface UserComment{
  id: number;
  task_id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: Date;

}
