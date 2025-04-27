import {useSelector} from "react-redux";
import {NavLink} from "react-router";
import {getUser} from "../../store/selectors";
import style from './style.module.css';

export const MainPage = () => {

  const {isAuthenticated} = useSelector(getUser);

  return (
    <div className={style.mainContent}>
      <header className="py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">🚀 Улучшай навыки программирования</h1>
          <p className="lead">Решай алгоритмические задачи, участвуй в рейтингах и готовься к собеседованиям!</p>

          <NavLink to={isAuthenticated ? "/tasks" : "/auth"} className="btn btn-lg btn-primary mt-3">
            Начать сейчас
          </NavLink>
        </div>
      </header>

      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h3>🧠 Алгоритмы</h3>
            <p>Развивайся, решая задачи по алгоритмам и структурам данных.</p>
          </div>

          <div className="col-md-4">
            <h3>💬 Обсуждения</h3>
            <p>Обменивайся решениями и учись у других.</p>
          </div>

          <div className="col-md-4">
            <h3>🎯 Готовься к собеседованиям</h3>
            <p>Практикуй задачи, которые встречаются на интервью в топ-компаниях.</p>
          </div>
        </div>
      </section>
    
    </div>
  );
};
