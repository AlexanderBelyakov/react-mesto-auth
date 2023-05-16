import { useState } from "react";
import { Link } from "react-router-dom";

export function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitSignUp(evt) {
    evt.preventDefault();
    props.onSignUp(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__header">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmitSignUp}>
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
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="login__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}
