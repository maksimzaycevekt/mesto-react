import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";
// import avatar from '../images/profile-avatar.png'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const cardsElements = cards.map((card) => (
    <Card card={card} key={card._id} onCardClick={onCardClick} />
  ));

  React.useEffect(() => {
    api
      .getPromiseAll()
      .then(([cards, info]) => {
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__hover" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt={userName} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            className="profile__button"
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать"
          ></button>
          <p className="profile__subtitle">{userDescription}</p>
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
