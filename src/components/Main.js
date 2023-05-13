import React from "react";
import editButton from "../images/eddit-button.png";
import addButton from "../images/add-button.png";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="shell">
          <button
            type="button"
            className="profile__button profile__edit-avatar-button"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="Аватарка"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__button"
            onClick={props.onEditProfile}
          >
            <img
              src={editButton}
              className="profile__edit-button"
              alt="Редактировать профиль"
            />
          </button>
        </div>
        <button
          type="button"
          className="profile__button"
          onClick={props.onAddPlace}
        >
          <img src={addButton} className="profile__add-button" alt="Добавить" />
        </button>
      </section>

      <section className="places">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
