import { Link } from "react-router-dom";
import { useState } from "react";
import "./LoginModal.css";

const LoginUser = ({ handleLogin, activeModal, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className={`modal ${activeModal === "login" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">Log in</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label" htmlFor="email">
            Email
          </label>
          <input
            className="modal__input"
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <label className="modal__label" htmlFor="password">
            Password
          </label>
          <input
            className="modal__input"
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              Log In
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>Already a member?</p>
          <Link to="signup" className="register__login-link">
            or Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
