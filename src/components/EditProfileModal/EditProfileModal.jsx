import { useState } from "react";
import "./EditProfileModal.css";

function EditProfileModal({ handleEditProfile, activeModal, onClose }) {
  const [data, setData] = useState({
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
          <label className="modal__label" htmlFor="avatar">
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
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
