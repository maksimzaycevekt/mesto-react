import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //подписка на контекст с инфо о пользователе
  const currentUser = useContext(CurrentUserContext);

  //проверка на принадлежность карточки пользователю
  //через сравнение id карточки с id пользователя
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  //отвечает за отображение состоянрия лайка в разметке
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  //пробрасывает card в imagePopup
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeliteCard() {
    onCardDelete(card._id);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__button-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__button-likes">{card.likes.length}</p>
        </div>
        {isOwn && (
          <button
            className="element__button-delite"
            type="button"
            aria-label="Удалить"
            onClick={handleDeliteCard}
          ></button>
        )}
      </div>
    </article>
  );
}
export default Card;
