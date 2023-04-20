import React from 'react';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'

function App() {

  //хуки для попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState([]);

  //слушатели для попапов
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  };

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handlecloseAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <div className="App" >   
        {/* Попап для редактирования профиля */}
        <PopupWithForm 
          name="popup-profile" 
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={handlecloseAllPopups}
          children={
            <>
              <input className="popup__input popup__input_type_name" id="input-profile-name" type="text" name="popup_name" minLength="2" maxLength="40" required/>
              <span className="popup__input-error input-profile-name-error"></span>
              <input className="popup__input popup__input_type_job" id="input-profile-job" type="text" name="popup_job" minLength="2" maxLength="200" required/>
              <span className="popup__input-error input-profile-job-error"></span>
              <button className="popup__button" id="profile-save-button" type="submit">Сохранить</button>
            </>
          }
        />
              
        {/* Попап для добалвения карточки */}
        <PopupWithForm 
          name="popup-images" 
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={handlecloseAllPopups}
          children={
            <>
              <input className="popup__input popup__input_type_image-name" id="card-name" type="text" name="popup_mesto" minLength="2" maxLength="30" placeholder="Название" required/>
              <span className="popup__input-error card-name-error"></span>
              <input className="popup__input popup__input_type_image-link" id="card-url" type="url" name="popup_link" placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error card-url-error"></span>
              <button className="popup__button" id="popup-add-image" type="submit">Создать</button>
            </>
          }
        />

        {/* Попап для подтверждения удаления */}
        <PopupWithForm 
          name="popup-delete" 
          title="Вы уверены?"
          onClose={handlecloseAllPopups}
          children={
            <>
              <button className="popup__button" id="delete-card-button" type="submit" aria-label="Удалить">Да</button>
            </>
          }
        />

        {/* Попап для смены аватара */}
        <PopupWithForm 
          name="popup-avatar" 
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={handlecloseAllPopups}
          children={
            <>
              <input className="popup__input popup__input_type_image-link" id="avatar-url" type="url" name="popup_link" placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error avatar-url-error"></span>
              <button className="popup__button" id="popup-save-avatar" type="submit">Сохранить</button>
            </>
          }
        />

        {/* Попап в котором откроется увеличенная картинка из карточки */}
        <ImagePopup 
          onClose={handlecloseAllPopups}
          card={selectedCard} />

        {/* Основная разметка страницы */}
        <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}/>
        <Footer />
    </div>
  );
}

export default App;
