function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_img ${card.link ? "popup_opened" : ""}`}
      id="popup-img-open"
    >
      <div className="popup__container popup__container_type_image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__text popup__text_type_img">{card.name}</p>
        <button
          className="popup__close-button"
          id="close-popup-window"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
