import "../Header/header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="wtwr logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-btn"
      >
        + Add clothes
      </button>
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
