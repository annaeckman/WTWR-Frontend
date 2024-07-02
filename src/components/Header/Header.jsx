import "../Header/header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img src={logo} alt="wtwr logo" className="header__logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__user-name">Terrance Tegegne</p>
            <img
              src={avatar}
              alt="Terrance Tegegne"
              className="header__user-avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
