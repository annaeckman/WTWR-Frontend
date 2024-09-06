import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import "./LoginModal.css";
import { Validation } from "../../utils/Validation";

const LoginUser = ({ handleLogin, activeModal, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
    resetForm();
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
            minLength="4"
            maxLength="64"
            placeholder="Email"
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
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <div className="login-modal__button-container ">
            <button
              type="submit"
              className={`login-modal__submit ${
                !isValid ? "login-modal__submit_disabled" : ""
              }`}
              disabled={`${!isValid ? "disabled" : ""}`}
            >
              Log In
            </button>
            <Link to="signup" className="login-modal__link">
              or Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
