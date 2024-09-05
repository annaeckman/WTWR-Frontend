import "./itemModal.css";

function ItemModal({ activeModal, card, onClose, handleDeleteClick }) {
  // const handleDeleteClick = () => {
  //   const token = getToken();
  //   console.log(`Token: ${token}`);
  //   console.log(`card_id: ${card._id}`);
  //   handleDeleteItem(card._id, token);
  //   onClose();
  // };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className="modal__delete-btn"
            onClick={handleDeleteClick}
          >
            {" "}
            Delete card
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
