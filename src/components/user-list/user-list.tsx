import {
  useEffect, useState
} from "react";
import {ProfilesApi} from "../../api/profiles.api";
import {User} from "../../types";
import {UserListItem} from "../user-list-item";
import style from './style.module.css';

export const UserList = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    ProfilesApi.getUsers({role: 'user'}).then((res) => setUsers(res));
  }, []);

  return (
    <ul className={style.userList}>
      {users.map((user) => (
        <li className={style.listItem} key={user.id}>
          <UserListItem user={user} />
        </li>
      ))}
    </ul>
  );
};
