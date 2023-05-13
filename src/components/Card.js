import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__like ${
    isLiked && "places__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="places__card">
      <button
        type="button"
        className="places__button-image"
        onClick={handleClick}
      >
        <img src={props.link} className="places__image" alt={props.name} />
      </button>
      <h2 className="places__text">{props.name}</h2>
      <button
        type="button"
        onClick={handleLike}
        className={cardLikeButtonClassName}
      ></button>
      <p className="places__like-counter">{props.likes}</p>
      {isOwn && (
        <button
          type="button"
          className="places__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}
    </div>
  );
}
export default Card;
