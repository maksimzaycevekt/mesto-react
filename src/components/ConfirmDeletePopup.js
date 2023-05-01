import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, handleDeliteCard }) {
  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeliteCard}
      children={
        <>
          <button
            className="popup__button"
            id="delete-card-button"
            type="submit"
            aria-label="Удалить"
          >
            Да
          </button>
        </>
      }
    />
  );
}

export default ConfirmDeletePopup;
