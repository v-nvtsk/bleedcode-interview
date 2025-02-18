import {useSelector} from 'react-redux';
import {
  NavLink, useLocation, useNavigate
} from 'react-router';
import {useAppDispatch} from '../../store/hooks/use-app-dispatch';
import {getUser} from '../../store/selectors';
import {userLogout} from '../../store/slices/user.slice';

export const AppHeader = () => {
  
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);
  const isUserAuthenticated = user.isAuthenticated;
  // 
  const signin = () => {
    navigate(`/auth?redirect=${location.pathname}`, {});
  };
  const logout = () => {
    appDispatch(userLogout());
    navigate(`/auth?redirect=${location.pathname}`, {replace: true});
  };
  const authorizedLinks = [
    {
      title: 'Задачи',
      url: '/tasks'
    },
    {
      title: 'Пользователи',
      url: '/users'
    }
  ];

  return (
    <header className="container-fluid bg-body-tertiary">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">

        <div className="container">
          <NavLink className="navbar-brand" to="/">BleedCode</NavLink>

          <button
            className="navbar-toggler"
            type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 w-100">
              {isUserAuthenticated && authorizedLinks.map(({
                title, url
              }) => {
                return (
                  <li className="nav-item" key={title + url}>
                    <NavLink className="nav-link active" aria-current="page" to={url}>{title}</NavLink>
                  </li>
                );
              })}

              {isUserAuthenticated && <li className="nav-item ms-auto">
                <button className="btn btn-outline-primary" onClick={logout}>Выйти</button>
              </li>}
                
              {!isUserAuthenticated && <li className="nav-item ms-auto">
                <button
                  onClick={signin} className="nav-link active" aria-current="page"
                  /* to="/auth" */
                >Войти</button>
              </li>}
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
};
