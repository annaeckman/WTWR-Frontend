import { useState, useCallback } from "react";
import "./RegisterModal.css";
import { Link } from "react-router-dom";
import { Validation } from "../../utils/Validation";

function RegisterModal({ handleRegistration, activeModal, onClose }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const { isValid, setIsValid, setErrors, errors } = Validation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (resetValues = {}, resetErrors = {}, resetIsValid = false) => {
      setData(resetValues);
      setErrors(resetErrors);
      setIsValid(resetIsValid);
    },
    [setData, setErrors, setIsValid]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
    resetForm();
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
            Email *
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
            Password *
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
            Name *
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
          <label className="register-modal__label" htmlFor="avatar">
            Avatar URL *
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
          <div className="register-modal__button-container">
            <button
              type="submit"
              className={`register-modal__submit ${
                !isValid ? "register-modal__submit_disabled" : ""
              }`}
              disabled={`${!isValid ? "disabled" : ""}`}
            >
              Sign up
            </button>
            <Link to="login" className="register-modal__link">
              or Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
