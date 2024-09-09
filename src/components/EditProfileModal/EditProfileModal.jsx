import { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";

function EditProfileModal({ handleEditProfile, activeModal, onClose }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
  };

  return (
    <div
      className={`modal ${activeModal === "edit-profile" && "modal_opened"}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">Change profile data</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label" htmlFor="name-edit-profile">
            Name *
          </label>
          <input
            className="modal__input"
            id="name-edit-profile"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            required
          />
          <label className="modal__label" htmlFor="avatar-edit-profile">
            Avatar *
          </label>
          <input
            className="modal__input"
            id="avatar-edit-profile"
            name="avatar"
            type="url"
            value={values.avatar}
            onChange={handleChange}
            required
          />
          <div className="modal__button-container">
            <button
              type="submit"
              className={`modal__submit ${
                !isValid ? "modal__submit_disabled" : ""
              }`}
              disabled={`${!isValid ? "disabled" : ""}`}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
