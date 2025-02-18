import type {
  User, UserProfile
} from "../types";
import {api} from "./api";

export class ProfilesApi{
  static async getProfile(id: number): Promise<UserProfile> {
    try{
      const {data: profile} = await api.get(`api/profiles/${id}`);

      return profile as UserProfile;
    }catch{
      throw new Error('Ошибка при получении профиля');
    }
  }

  /**
  * Получает список пользователей.
  *
  * @returns Массив объектов User.
  * @throws Ошибка, если получение списка пользователей не было успешным.
  */
  static async getUsers({role}:{role: string}):Promise<User[]> {

    const {
      data: users, status, statusText
    } = await api.get<User[]>('/api/profiles', {params: {role}});

    if (status === 200) {
      return users;
    }
    throw new Error(statusText);
  }

  /*
  * Обновляет пользователя.
  *
  * @param user - Объект пользователя, который нужно обновить.
  * @returns Булево значение, указывающее на успешность обновления.
  * @throws Ошибка, если обновление не было успешным.
  */
  static async updateUser(user: User) {
    const {
      status, statusText
    } = await api.put(`/api/profiles/${user.id}`, user);

    if (status === 200) {
      return true;
    }
    throw new Error(statusText);
  }

}
