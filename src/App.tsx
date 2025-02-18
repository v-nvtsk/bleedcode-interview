import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import './App.css';
import {useEffect} from "react";
import {useSelector} from 'react-redux';
import {
  BrowserRouter, Route, Routes
} from 'react-router';
import {AppHeader} from './components/app-header';
import {Unauthorized} from "./components/unauthorized";
import {
  AuthPage, MainPage, TaskPage,
  TasksPage, UserPage, UsersPage,
} from './pages';
import {useAppDispatch} from "./store/hooks/use-app-dispatch";
import {getUser} from './store/selectors';
import {updateSession} from "./store/slices/user.slice";

export function App() {

  const {
    isLoading, isAuthenticated, isInitialized, profile: {role}
  } = useSelector(getUser);
  const appDispatch = useAppDispatch();
  const isAuthorized = role === 'interviewer' && isAuthenticated;

  useEffect(() => {
    if (!isLoading && !isInitialized){
      appDispatch(updateSession());
    }
  }, [appDispatch]);

  return (
    <>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <AppHeader />
        {isAuthenticated && !isAuthorized && <Unauthorized />}

        <div className="container content-wrapper">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {isAuthorized && <Route path="tasks" element={<TasksPage />} />}
            {isAuthorized && <Route path="users" element={<UsersPage />} />}
            {isAuthorized && <Route path="user/:id" element={<UserPage />} />}
            {isAuthorized && <Route path="task/:id" element={<TaskPage />} />}
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
