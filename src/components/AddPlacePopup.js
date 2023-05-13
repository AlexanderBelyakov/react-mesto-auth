import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleInputName(e) {
    setName(e.target.value);
  }

  function handleInputLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Новое место"}
      form={"country"}
      name={"additor"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            value={name}
            onChange={handleInputName}
            type="text"
            id="country-name-input"
            placeholder="Название"
            name="countryName"
            className="popup__input"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="country-name-input-error popup__input-error">
            ОЩИБКА
          </span>
          <input
            value={link}
            onChange={handleInputLink}
            type="url"
            id="country-image-input"
            placeholder="Ссылка на картинку"
            name="countryImage"
            className="popup__input"
            required
          />
          <span className="country-image-input-error popup__input-error">
            ОЩИБКА
          </span>
        </>
      }
    />
  );
}
