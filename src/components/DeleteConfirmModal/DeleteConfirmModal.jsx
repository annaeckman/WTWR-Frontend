import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ activeModal, onClose, onDelete }) {
  return (
    <div className={`modal ${activeModal === "delete-item" && "modal_opened"}`}>
      <div className="modal__content_type_delete">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <p className="modal__heading-delete">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="submit"
          className="modal__delete-confirm"
          onClick={onDelete}
        >
          Yes, delete item
        </button>
        <button
          className="modal__delete-cancel"
          onClick={onClose}
          type="submit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
