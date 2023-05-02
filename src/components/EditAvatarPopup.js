import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //реф на инпут с url
  const avatarRef = useRef();

  //передаёт value в app для api запроса
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_image-link"
            id="avatar-url"
            type="url"
            name="popup_link"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <span className="popup__input-error avatar-url-error"></span>
          <button
            className="popup__button"
            id="popup-save-avatar"
            type="submit"
          >
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
