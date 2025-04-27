export const Unauthorized = () => {
  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      <div className="alert alert-danger" role="alert">
        Вы не авторизованы для доступа к этой системе!
        <br />
        Только пользователи с ролью "интервьюер" могут быть допущены.
      </div>
    </div>
  );
};
