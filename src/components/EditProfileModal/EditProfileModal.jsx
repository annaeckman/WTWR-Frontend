import { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ handleEditProfile, isOpen, isLoading, onClose }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = () => {
    handleEditProfile(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ username: "", avatarUrl: "" });
  };

  return (
    <ModalWithForm
      title="change profile data"
      buttonText={isLoading ? "Updating" : "Save changes"}
      altButtonText={""}
      altButtonClick={() => setActiveModal("edit-profile")}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="name-edit-profile">
        Name *
      </label>
      <input
        className="modal__input"
        id="name-edit-profile"
        name="name"
        type="text"
        value={values.name || ""}
        onChange={handleChange}
        required
        placeholder={currentUser?.name || ""}
      />
      <label className="modal__label" htmlFor="avatar-edit-profile">
        Avatar *
      </label>
      <input
        className="modal__input"
        id="avatar-edit-profile"
        name="avatar"
        type="url"
        value={values.avatar || ""}
        onChange={handleChange}
        required
        placeholder={currentUser?.avatar || ""}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
