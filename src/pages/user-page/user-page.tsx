import {
  useEffect, useState
} from "react";
import {useParams} from "react-router";
import {ProfilesApi} from "../../api/profiles.api";
import {UserIcon} from "../../components/user-icon";
import {UserProfile} from "../../types";

export const UserPage = () => {
  const params = useParams();
  const id = Number(params.id); const [error, setError] = useState("");
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    username: '',
    role: '',
    status: '',
    rating: 0,
    solutions: []
  });

  useEffect(() => {

    if (Number.isNaN(id)){
      setError(`Задача с id="${params.id}" не найдена...`);

      return;
    }
    ProfilesApi.getProfile(id)
      .then((res:UserProfile) => {
        setProfile(res);
      });
  }, []);
  if (error){
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2 className="mt-3 border-bottom-1">{profile.username}</h2>

      <div className="mt-3 d-flex flex-wrap gap-5 justify-content-between">
        <div className="col-auto d-flex justify-content-center align-items-center p-5 profile-header rounded shadow-sm">
          <UserIcon size={160} />
        </div>

        <div className="col-9 mt-4">
          <div className="row">
            <div className="col-md-6">
              <h5>Информация о пользователе</h5>

              <ul className="list-unstyled">
                <li><strong>Роль: </strong>{profile.role}</li>
                <li><strong>Статус: </strong>{profile.status}</li>
                <li><strong>Рейтинг: </strong>{profile.rating}</li>
              </ul>
            </div>

            <div className="d-flex gap-3 profile-actions mt-4 text-center">
              <button className="btn btn-primary">Редактировать</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h5 className="h3-ns">Решенные задачи</h5>

        <table className="table" v-if="profile.solutions!.length>0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>

          <tbody>
            {profile.solutions?.map((item, index) => {
              return(
                <tr key={item!.id}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    {item.title}
                  </td>
  
                  <td>
                    {item.mark}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};
