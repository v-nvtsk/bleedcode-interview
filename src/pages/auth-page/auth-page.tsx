import {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef, useState
} from "react";
import {useSelector} from "react-redux";
import {
  useNavigate, useSearchParams
} from "react-router";
import {useAppDispatch} from "../../store/hooks/use-app-dispatch";
import {getUser} from "../../store/selectors";
import {
  userLogin, userRegister
} from "../../store/slices/user.slice";
import styles from './style.module.css';

export const AuthPage = () => {

  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState('');
  const form = {
    username: useRef<HTMLInputElement>(null),
    password: useRef < HTMLInputElement>(null),
    role: useRef<HTMLSelectElement>(null)
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate(searchparams.get("redirect") || '/');
    }
    if (user.errorState.isError){
      setErrorMessage(user.errorState.errorMessage);
    }
  }, [user.errorState.isError, user.errorState.errorMessage, user.isAuthenticated, searchparams, navigate]);

  function signin() {
    if (form.username.current?.value && form.password.current?.value)
    {
      dispatch(userLogin({
        username: form.username.current.value,
        password: form.password.current.value
      }));
    }
  }

  function signup() {
    if (form.username.current?.value && form.password.current?.value && form.role.current?.value) {
      dispatch(userRegister({
        username: form.username.current?.value,
        password: form.password.current?.value,
        role: form.role.current?.value
      }));
    } }

  function toggleAuth(event:MouseEvent) {
    event.preventDefault();
    setIsLogin(!isLogin);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLogin) {
      signin();
    } else {
      signup();
    }
  }

  return (
    <div className={`auth-page d-flex justify-content-center align-items-center`}>
      <div className={`${styles.authContainer} position-absolute top-50 translate-middle-y border rounded shadow p-4 bg-light`}>
        <h1 className="text-center mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="error-message text-danger text-center mb-3">
            {errorMessage && <span>{errorMessage}</span>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Имя пользователя</label>

            <input
              id="username"
              ref={form.username}
              type="text"
              className="form-control"
              placeholder="Введите имя пользователя"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Пароль</label>

            <input
              id="password"
              ref={form.password}
              type="password"
              className="form-control"
              placeholder="Введите пароль"
              required
            />
          </div>

          {!isLogin && <div className="form-group mb-4">
            <label className="form-label" htmlFor="role">Роль пользователя</label>

            <select
              className="form-select"
              id="role"
              ref={form.role}
              required
            >
              <option value="user">Пользователь</option>
              <option value="interviewer">Интервьюер</option>
            </select>
          </div>}

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? 'Вход' : 'Регистрация'}
          </button>
        </form>

        <p className="text-center mt-3">
          {isLogin ? "Ещё нет аккаунта? " : 'Уже есть аккаунт? '}

          <a href="#" onClick={toggleAuth}>
            {isLogin ? 'Регистрация' : 'Вход'}
          </a>
        </p>
      </div>
    </div>
  );
};
