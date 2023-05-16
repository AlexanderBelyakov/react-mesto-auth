import { useState } from "react";

export function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitSignIn(evt) {
    evt.preventDefault();
    props.onSignIn(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__header">Вход</h2>
      <form className="login__form" onSubmit={handleSubmitSignIn}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleInputEmail}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          required
          onChange={handleInputPassword}
        />
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
