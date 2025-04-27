import type {User} from '../types';
import {api} from './api';

export type ApiUser = Pick<User, "accessToken" | "id" | "role" | "username">;
export class AuthApi {
  static async login(username: string, password: string): Promise<ApiUser> {
    try{
      const response = await api.post <ApiUser>(`api/auth/login`, {
        username,
        password
      });

      localStorage.setItem('token', response.data.accessToken);

      return response.data;
    }catch{
      throw new Error('Неверное имя пользователя или пароль');}
  }

  static async register(username: string, password: string, role: string) {

    const response = await api.post('/api/auth/register', {
      username,
      password,
      role
    });

    if (response.status === 201) {return true;}

    return false;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('token');
    try {
      await api.get(`api/auth/logout`);
    } catch {
      throw new Error('Failed to register new user');
    }
  }

  static async updateSession(): Promise<User | undefined> {
    try {
      const accessToken = localStorage.getItem('token');

      if (!accessToken) {return;}
      try{
        const response = await api.post(`/api/auth/refresh`, {accessToken});

        if (response.status === 200){
          localStorage.setItem('token', response.data.accessToken);

          return response.data;
        }
      }catch{
        localStorage.removeItem('token');
      }
    } catch {
      throw new Error('Failed to update session...');
    }
  }
}
