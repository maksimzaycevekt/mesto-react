import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirmDeletePopupClick,
}) {
  //подписка на контекст с информацией профиля
  const currentUser = useContext(CurrentUserContext);

  //перебирает массив карточек и рендерит их на странице
  const cardsElements = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      onConfirmDeletePopupClick={onConfirmDeletePopupClick}
    />
  ));

  return (
    <main>
      <section className="profile">
        <div className="profile__hover" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__button"
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать"
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить"
        ></button>
      </section>

      <section className="elements">{cardsElements}</section>
    </main>
  );
}

export default Main;
