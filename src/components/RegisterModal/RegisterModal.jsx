import { useState } from "react";
import "./RegisterModal.css";
import { Link } from "react-router-dom";

function RegisterModal({ handleRegistration, activeModal, onClose }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
    handleRegistration(data);
    // sign user in after successful registration
  };

  return (
    <div className={`modal ${activeModal === "register" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">Sign Up</h2>
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
          <label className="modal__label" htmlFor="name">
            Name
          </label>
          <input
            className="modal__input"
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
            required
          />
          <label className="modal__label" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            className="modal__input"
            id="avatar"
            name="avatar"
            type="url"
            value={data.avatar}
            onChange={handleChange}
            required
          />
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              Sign up
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>Already a member?</p>
          <Link to="login" className="register__login-link">
            or Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
