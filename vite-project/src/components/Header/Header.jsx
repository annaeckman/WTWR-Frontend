import "../Header/header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="wtwr logo" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__user-name">Terrance Tegegne</p>
        <img
          src={avatar}
          alt="Terrance Tegegne"
          className="header__user-avatar"
        />
      </div>
    </header>
  );
}

export default Header;
