import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  //стейт хранит в себе данные пользователя
  const [currentUser, setСurrentUser] = React.useState({});

  //при монтировании запрашивает данные пользователя с сервера
  //передаёт их в стейт currentUser
  React.useEffect(() => {
    api
      .getInfoUser()
      .then((info) => {
        setСurrentUser(info);
      })
      .catch((err) => console.log(err));
  }, []);

  //стейт хранит в себе объект с карточками
  const [cards, setCards] = React.useState([]);

  //при монтировании запрашивает карточки с сервера
  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  //стейты
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);

  //стейт для карточек
  const [selectedCard, setSelectedCard] = React.useState({});

  //слушатели для попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeletePopupClick() {
    setIsConfirmDeletePopupOpen(true);
  }

  //закрывает все попапы
  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  }

  //обновляет стейт selectedCard
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //отправляет обновлённые данные профиля на сервер
  //при сабмите попапа ред. профиля
  function handleUpdateUser(object) {
    api
      .setUserInfo(object)
      .then((res) => {
        setСurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //отправляет url на сервер при сабмите попапа ред. аватара
  function handleUpdateAvatar(url) {
    api
      .setUserAvatar(url)
      .then((res) => {
        setСurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //отправляет данные новой карточки на сервер
  //при сабмите попапа добавления карточки
  function handleAddCard(cardInfo) {
    api
      .postCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //отвечает за работу лайков/дизлайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  //отвечает за удаление карточек по клику на урну
  function handleDeliteCard(id) {
    api.deleteCard(id).then(() => {
      const cardUpdate = cards.filter((card) => card._id !== id);
      setCards(cardUpdate);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {/* Основная разметка страницы */}
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeliteCard}
          onConfirmDeletePopupClick={handleConfirmDeletePopupClick}
        />
        <Footer />
        {/* Попап для редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* Попап для добалвения карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddCard={handleAddCard}
        />
        {/* Попап для подтверждения удаления */}
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={handleCloseAllPopups}
          onCardDelete={handleDeliteCard}
        />
        {/* Попап для смены аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* Попап в котором откроется увеличенная картинка из карточки */}
        <ImagePopup onClose={handleCloseAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
