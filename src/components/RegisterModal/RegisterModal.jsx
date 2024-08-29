import { useState } from "react";
import "./RegisterModal.css";

function RegisterModal({ handleRegistration, activeModal, onClose }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
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
          <label className="modal__label" htmlFor="avatarUrl">
            Avatar URL
          </label>
          <input
            className="modal__input"
            id="avatarUrl"
            name="avatarUrl"
            type="url"
            value={data.avatarUrl}
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
