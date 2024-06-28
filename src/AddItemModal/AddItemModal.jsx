import React from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal = (closeActiveModal, onAddItem, isOpen) => {
  return (
    <ModalWithForm
      title="new garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={onAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          placeholder="Name"
          id="name"
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          placeholder="Image URL"
          id="imageUrl"
          type="url"
          className="modal__input"
          minLength="1"
          maxLength="30"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          {" "}
          <input
            name="radio"
            id="hot"
            type="radio"
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="radio"
            id="warm"
            type="radio"
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="radio"
            id="cold"
            type="radio"
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>{" "}
    </ModalWithForm>
  );
};

export default AddItemModal;
