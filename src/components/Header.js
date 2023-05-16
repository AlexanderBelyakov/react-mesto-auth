import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

export function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <p className="header__user-email">{props.userEmail}</p>
      <Link to={props.route} className="header__link" onClick={props.onClick}>{props.text}</Link>
    </header>
  );
}
