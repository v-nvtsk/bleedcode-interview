import {NavLink} from "react-router";
import {ProfilesApi} from "../../api/profiles.api";
import {User} from "../../types";
import {Rating} from "../rating";
import style from './style.module.css';

export const UserListItem = ({user}:{user: User}) => {
  const {
    id, username, rating
  } = user;
  const updateRating = (value:number) => {
    ProfilesApi.updateUser({
      ...user,
      rating: value
    });
  };

  return (
    <div className={style.userListItem}>
      <NavLink className="d-flex w-100 justify-content-between align-items-center" to={`/user/${id}`}>
        <p className="flex-grow-1 p-0 m-0">{username}</p>
        <p className="p-0 m-0">Рейтинг: </p>
      </NavLink>

      <div className={style.rating}>
        <Rating rating={rating} onChange={updateRating} />
      </div>
    </div>
  );
};
