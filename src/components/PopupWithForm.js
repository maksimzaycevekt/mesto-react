function PopupWithForm({ isOpen, name, onClose, title, children, onSubmit }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={name}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          id="close-popup-profile"
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__text">{title}</h2>
        <form
          className="popup__form"
          id="profile-name-input"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
