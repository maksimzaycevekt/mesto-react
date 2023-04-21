function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
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
            className="element__button"
            type="button"
            aria-label="Лайк"
          ></button>
          <p className="element__button-likes">{card.likes.length}</p>
        </div>
        <button
          className="element__button-delite"
          type="button"
          aria-label="Удалить"
        ></button>
      </div>
    </article>
  );
}
export default Card;
