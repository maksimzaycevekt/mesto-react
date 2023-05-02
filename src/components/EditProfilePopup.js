import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  //стейты со значениями полей
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //функции захватывающие значения полей и передающие их в стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  //передаёт значения по умолчанию в инпуты имени/деятельности
  //после загрузки пользователя из api
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_name"
            id="input-profile-name"
            type="text"
            name="popup_name"
            minLength="2"
            maxLength="40"
            required
            value={name || ""}
            onChange={handleChangeName}
          />
          <span className="popup__input-error input-profile-name-error"></span>

          <input
            className="popup__input popup__input_type_job"
            id="input-profile-job"
            type="text"
            name="popup_job"
            minLength="2"
            maxLength="200"
            required
            value={description || ""}
            onChange={handleChangeDescription}
          />
          <span className="popup__input-error input-profile-job-error"></span>

          <button
            className="popup__button"
            id="profile-save-button"
            type="submit"
          >
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default EditProfilePopup;
