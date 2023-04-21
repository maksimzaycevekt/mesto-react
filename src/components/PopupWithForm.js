function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={props.name}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          id="close-popup-profile"
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__text">{props.title}</h2>
        <form
          className="popup__form"
          id="profile-name-input"
          name={props.name}
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
